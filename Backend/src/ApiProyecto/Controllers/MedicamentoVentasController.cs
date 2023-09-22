using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiProyecto.Dtos;
using ApiProyecto.Dtos.MedicamentoVenta;
using ApiProyecto.Helpers;
using AutoMapper;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ApiProyecto.Controllers;
public class MedicamentoVentasController:BaseApiController
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

    //CONSULTA PARA DETERMINAR TOTAL DE DINERO RECAUDADO POR TODAS LAS VENTAS DE MEDICAMENTOS
    [HttpGet("TotalDeVentas")]
    //[Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<TotalVentaMedicamentoDto>> GetTotalVentasMed()
    {
        var lstVentaMedicamentos = await _unitOfWork.MedicamentosVendidos.GetAllAsync();

        if ((lstVentaMedicamentos.Count() == 0) || (lstVentaMedicamentos == null))
        {
            throw new UnauthorizedAccessException("No se encontro ninguna Venta");
        }

        TotalVentaMedicamentoDto totalVentaMedicamentoDto = new();
        var totalVentas = 0.0;
        foreach (var ventaMed in lstVentaMedicamentos)
        {
            totalVentas += ventaMed.Precio;  
        }
        totalVentaMedicamentoDto.PrecioTotalDeVentas = totalVentas;

        return _mapper.Map<TotalVentaMedicamentoDto>(totalVentaMedicamentoDto);
    }

}
