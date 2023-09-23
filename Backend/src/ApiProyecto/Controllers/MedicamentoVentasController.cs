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
    public class MedicamentoVentasController:BaseApiControllerN
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public MedicamentoVentasController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }
         [HttpGet]
        //[Authorize]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Pager<MedicamentoVentaDTO>>> Get([FromQuery] Params param)
        {
            var medicamentoVenta = await _unitOfWork.MedicamentosVendidos.GetAllAsync(param.PageIndex, param.PageSize, param.Search);
            var lstVentas = _mapper.Map<List<MedicamentoVentaDTO>>(medicamentoVenta.registros);
            return new Pager<MedicamentoVentaDTO>(lstVentas, medicamentoVenta.totalRegistros, param.PageIndex, param.PageSize, param.Search);
        }

        [HttpGet("{id}")]
        //[Authorize]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<MedicamentoVentaDTO>> Get(int id)
        {
            var medicamentoVenta = await _unitOfWork.MedicamentosVendidos.GetByIdAsync(id);
            return _mapper.Map<MedicamentoVentaDTO>(medicamentoVenta);
        }

        [HttpGet("vendidosDespues-1-Enero-2023")]
        public ActionResult GetMedVendidosDespuesDe()
        {
            var medicamentos = _unitOfWork.Ventas.Find(v =>v.FechaVenta > new DateTime(2023,1,1));
            if(medicamentos is null) return NotFound();
            var result = medicamentos.Select(v =>new{
                IdVenta =v.Id,
                v.FechaVenta,
                MedicamentosRecetados = v.MedicamentosVendidos.Select(m =>new{MedicamentoId= m.Id,Nombre = m.Medicamento.Nombre,m.Precio,m.CantidadVendida}).ToList()
            });
            return Ok(result);
        }
    }
