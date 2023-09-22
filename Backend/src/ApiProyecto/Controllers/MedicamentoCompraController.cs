using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiProyecto.Dtos;
using ApiProyecto.Helpers;
using AutoMapper;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ApiProyecto.Controllers;
    public class MedicamentoCompraController:BaseApiControllerN
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public MedicamentoCompraController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }
         [HttpGet]
        //[Authorize]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Pager<MedicamentoCompraDTO>>> Get([FromQuery] Params param)
        {
            var medicamentoCompra = await _unitOfWork.MedicamentosComprados.GetAllAsync(param.PageIndex, param.PageSize, param.Search);
            var lstCompras = _mapper.Map<List<MedicamentoCompraDTO>>(medicamentoCompra.registros);
            return new Pager<MedicamentoCompraDTO>(lstCompras, medicamentoCompra.totalRegistros, param.PageIndex, param.PageSize, param.Search);
        }

        [HttpGet("{id}")]
        //[Authorize]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<MedicamentoCompraDTO>> Get(int id)
        {
            var medicamentoCompra = await _unitOfWork.MedicamentosComprados.GetByIdAsync(id);
            return _mapper.Map<MedicamentoCompraDTO>(medicamentoCompra);
        }

       /*  [HttpPut("{id}")]
        //[Authorize(Roles="Administrador")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<MedicamentoCompraDTO>> Put(int id, [FromBody] MedicamentoCompraPutDTO medicamentoCompraEdit)
        {
            var Anterior= await _unitOfWork.MedicamentosComprados.GetByIdAsync(id);
            if (medicamentoCompraEdit == null || Anterior==null) return NotFound();
            var medicamentoCompra = _mapper.Map<MedicamentoCompra>(medicamentoCompraEdit);
            medicamentoCompra.Id = id;
            _unitOfWork.MedicamentosComprados.Update(medicamentoCompra, Anterior);
            await _unitOfWork.SaveAsync();
            return _mapper.Map<MedicamentoCompraDTO>(medicamentoCompra);
        } */
    }
