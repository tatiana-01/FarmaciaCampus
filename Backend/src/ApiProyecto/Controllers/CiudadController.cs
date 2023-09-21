using ApiProyecto.Dtos.Ciudad;
using ApiProyecto.Helpers;
using ApiProyecto.Controllers;
using AutoMapper;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiProyecto.Controllers;
    [ApiVersion("1.0")]
    public class CiudadController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CiudadController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost]
        [ApiVersion("1.0")]
        //[Authorize(Roles="Administrador")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CiudadDTO>> Post(CiudadPostDTO ciudadDTO)
        {
            var ciudad = _mapper.Map<Ciudad>(ciudadDTO);
            _unitOfWork.Ciudades.Add(ciudad);
            await _unitOfWork.SaveAsync();
            if (ciudad == null) return BadRequest();
            return _mapper.Map<CiudadDTO>(ciudad);
        }

        [HttpGet]
        //[Authorize]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Pager<CiudadGetAllDTO>>> Get([FromQuery] Params param)
        {
            var ciudads = await _unitOfWork.Ciudades.GetAllAsync(param.PageIndex, param.PageSize, param.Search);
            var lstCiudades = _mapper.Map<List<CiudadGetAllDTO>>(ciudads.registros);
            return new Pager<CiudadGetAllDTO>(lstCiudades, ciudads.totalRegistros, param.PageIndex, param.PageSize, param.Search);
        }

        [HttpGet("{id}")]
        //[Authorize]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CiudadGetAllDTO>> Get(int id)
        {
            var ciudad = await _unitOfWork.Ciudades.GetByIdAsync(id);
            return _mapper.Map<CiudadGetAllDTO>(ciudad);
        }

        [HttpPut("{id}")]
        //[Authorize(Roles="Administrador")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CiudadDTO>> Put(int id, [FromBody] CiudadPostDTO ciudadEdit)
        {
            if (ciudadEdit == null) return NotFound();
            var ciudad = _mapper.Map<Ciudad>(ciudadEdit);
            ciudad.Id = id;
            _unitOfWork.Ciudades.Update(ciudad);
            await _unitOfWork.SaveAsync();
            return _mapper.Map<CiudadDTO>(ciudad);
        }

        [HttpDelete("{id}")]
        //[Authorize(Roles="Administrador")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Delete(int id)
        {
            var ciudad = await _unitOfWork.Ciudades.GetByIdAsync(id);
            if (ciudad == null) BadRequest();
            _unitOfWork.Ciudades.Remove(ciudad);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }
    }
