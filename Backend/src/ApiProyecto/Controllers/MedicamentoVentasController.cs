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
using Microsoft.IdentityModel.Tokens;

namespace ApiProyecto.Controllers;
public class MedicamentoVentasController : BaseApiControllerN
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public MedicamentoVentasController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
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
        }    //CONSULTA PARA DETERMINAR TOTAL DE DINERO RECAUDADO POR TODAS LAS VENTAS DE MEDICAMENTOS
    [HttpGet("TotalDeVentasRecaudado")]
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

    //CONSULTA PARA DETERMINAR EL TOTAL DE MEDICAMENTOS VENDIDOS POR MES EN UN DETERMINADO AÑO
    [HttpGet("TotalDeMedicamentosVendidosEn/{fecha}")]
    //[Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<TotalMedicamentosVendidosDTO>> GetTotalDeMedicVendidos(DateTime fecha)
    {
        var lstTotalDeMedicamentos = await _unitOfWork.MedicamentosVendidos.GetAllTotalMedicamentosVendidosAsync(fecha);

        if ((lstTotalDeMedicamentos.Count() == 0) || (lstTotalDeMedicamentos == null))
        {
            throw new UnauthorizedAccessException("No se encontro ninguna medicamento vendido en esa fecha");
        }

        TotalMedicamentosVendidosDTO totalMedicamentosVendidosDTO = new();
        var TotalMedic = 0;
        foreach (var lstVentas in lstTotalDeMedicamentos)
        {
            foreach (var totalMedicamentos in lstVentas.MedicamentosVendidos)
            {
                TotalMedic += totalMedicamentos.CantidadVendida;   
            }  
        }
        totalMedicamentosVendidosDTO.TotalDeMedicamentosVendidos = TotalMedic;

        return _mapper.Map<TotalMedicamentosVendidosDTO>(totalMedicamentosVendidosDTO);
    }

    //CONSULTA PARA DETERMINAR EL PROMEDIO DE MEDICAMENTOS VENDIDOS POR VENTA 
    [HttpGet("PromedioMedicamentosPorVenta")]
    //[Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<object> GetMedicamentoPrecioStock()
    {
        var promedioVenta = _unitOfWork.MedicamentosVendidos.GetCalcularPromedioPorVentas();

        if (promedioVenta.IsNullOrEmpty())
        {
            throw new UnauthorizedAccessException("No se encontro ningun venta para hacer el promedio");
        }
        
        return Ok(promedioVenta);
    }
}
