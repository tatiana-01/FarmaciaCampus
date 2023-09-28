using ApiProyecto.Dtos;
using ApiProyecto.Helpers;
using AutoMapper;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiProyecto.Controllers;
[ApiVersion("1.0")]
    public class ComprasController:BaseApiControllerN
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
        public async Task<ActionResult<Pager<CompraDTO>>> Get([FromQuery] Params param)
        {
            var compras = await _unitOfWork.Compras.GetAllAsync(param.PageIndex, param.PageSize, param.Search);
            var lstCompras = _mapper.Map<List<CompraDTO>>(compras.registros);
            return new Pager<CompraDTO>(lstCompras, compras.totalRegistros, param.PageIndex, param.PageSize, param.Search);
        }

        [HttpGet("{id}")]
        //[Authorize]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CompraDTO>> Get(int id)
        {
            var compra = await _unitOfWork.Compras.GetByIdAsync(id);
            return _mapper.Map<CompraDTO>(compra);
        }

        [HttpPut("{id}")]
        //[Authorize(Roles="Administrador")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CompraDTO>> Put(int id, [FromBody] CompraPutDTO compraEdit)
        {
            var Anterior= await _unitOfWork.Compras.GetByIdAsync(id);
            if (compraEdit == null || Anterior==null) return NotFound();
            var compra = _mapper.Map<Compra>(compraEdit);
            compra.Id = id;
            _unitOfWork.Compras.Update(compra, Anterior);
            await _unitOfWork.SaveAsync();
            return _mapper.Map<CompraDTO>(compra);
        }


    }
