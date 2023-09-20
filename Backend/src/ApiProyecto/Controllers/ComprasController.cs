using ApiProyecto.Dtos;
using ApiProyecto.Helpers;
using AutoMapper;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiProyecto.Controllers;
[ApiVersion("1.0")]
    public class ComprasController:BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ComprasController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        
        [HttpPost]
        //[Authorize(Roles="Administrador")]
        [ApiVersion("1.0")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CompraDTO>> Post(CompraPostDTO CompraDTO)
        {
            var compra = _mapper.Map<Compra>(CompraDTO);
            _unitOfWork.Compras.Add(compra);
            await _unitOfWork.SaveAsync();
            if(compra==null) return BadRequest();
            return _mapper.Map<CompraDTO>(compra);
        }

        [HttpGet]
        //[Authorize]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Pager<CompraGetAllDTO>>> Get([FromQuery] Params param)
        {
            var compras = await _unitOfWork.Compras.GetAllAsync(param.PageIndex, param.PageSize, param.Search);
            var lstCompras = _mapper.Map<List<CompraGetAllDTO>>(compras.registros);
            return new Pager<CompraGetAllDTO>(lstCompras, compras.totalRegistros, param.PageIndex, param.PageSize, param.Search);
        }

        [HttpGet("{id}")]
        //[Authorize]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CompraGetAllDTO>> Get(int id)
        {
            var compra = await _unitOfWork.Compras.GetByIdAsync(id);
            return _mapper.Map<CompraGetAllDTO>(compra);
        }

        [HttpPut("{id}")]
        //[Authorize(Roles="Administrador")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CompraDTO>> Put(int id, [FromBody] CompraPutDTO compraEdit)
        {
            if (compraEdit == null) return NotFound();
            var compra = _mapper.Map<Compra>(compraEdit);
            compra.Id = id;
            _unitOfWork.Compras.Update(compra);
            await _unitOfWork.SaveAsync();
            return _mapper.Map<CompraDTO>(compra);
        }

        [HttpDelete("{id}")]
        //[Authorize(Roles="Administrador")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Delete(int id)
        {
            var compra = await _unitOfWork.Compras.GetByIdAsync(id);
            if (compra == null) BadRequest();
            _unitOfWork.Compras.Remove(compra);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }

    }
