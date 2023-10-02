using ApiProyecto.Dtos.Departamento;
using ApiProyecto.Helpers;
using AutoMapper;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiProyecto.Controllers;
    [ApiVersion("1.0")]
    public class DepartamentoController : BaseApiController
    {
    public DepartamentoController(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    [HttpPost]
        [ApiVersion("1.0")]
        //[Authorize(Roles="Administrador")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<DepartamentoDTO>> Post(DepartamentoPostDTO departamentoDTO)
        {
            var departamento = _mapper.Map<Departamento>(departamentoDTO);
            _unitOfWork.Departamentos.Add(departamento);
            await _unitOfWork.SaveAsync();
            if (departamento == null) return BadRequest();
            return _mapper.Map<DepartamentoDTO>(departamento);
        }

        [HttpGet]
        //[Authorize]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Pager<DepartamentoGetAllDTO>>> Get([FromQuery] Params param)
        {
            var departamentos = await _unitOfWork.Departamentos.GetAllAsync(param.PageIndex, param.PageSize, param.Search);
            var lstDepartamentos = _mapper.Map<List<DepartamentoGetAllDTO>>(departamentos.registros);
            return new Pager<DepartamentoGetAllDTO>(lstDepartamentos, departamentos.totalRegistros, param.PageIndex, param.PageSize, param.Search);
        }

        [HttpGet("{id}")]
        //[Authorize]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<DepartamentoGetAllDTO>> Get(int id)
        {
            var departamento = await _unitOfWork.Departamentos.GetByIdAsync(id);
            return _mapper.Map<DepartamentoGetAllDTO>(departamento);
        }

        [HttpPut("{id}")]
        //[Authorize(Roles="Administrador")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<DepartamentoDTO>> Put(int id, [FromBody] DepartamentoPostDTO departamentoEdit)
        {
            if (departamentoEdit == null) return NotFound();
            var departamento = _mapper.Map<Departamento>(departamentoEdit);
            departamento.Id = id;
            _unitOfWork.Departamentos.Update(departamento);
            await _unitOfWork.SaveAsync();
            return _mapper.Map<DepartamentoDTO>(departamento);
        }

        [HttpDelete("{id}")]
        //[Authorize(Roles="Administrador")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Delete(int id)
        {
            var departamento = await _unitOfWork.Departamentos.GetByIdAsync(id);
            if (departamento == null) BadRequest();
            _unitOfWork.Departamentos.Remove(departamento);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }
    }
