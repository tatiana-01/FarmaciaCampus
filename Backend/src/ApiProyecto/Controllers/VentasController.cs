using ApiProyecto.Dtos;
using ApiProyecto.Helpers;
using AutoMapper;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiProyecto.Controllers;
[ApiVersion("1.0")]
public class VentasController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public VentasController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        this._unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    [HttpPost]
    //[Authorize(Roles="Administrador")]
    [ApiVersion("1.0")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<VentaDTO>> Post(VentaPostDTO VentaDTO)
    {
        foreach (var item in VentaDTO.MedicamentosVendidos)
        {
            var medicamento = _unitOfWork.Medicamentos.GetByIdAsync(item.MedicamentoId);
            if (medicamento.Result.Stock < item.CantidadVendida) return BadRequest(
                new
                {
                    mensaje = "No hay suficientes unidades en stock"
                }
            );
            medicamento.Result.Stock -= item.CantidadVendida;
        }
        var venta = _mapper.Map<Venta>(VentaDTO);
        _unitOfWork.Ventas.Add(venta);
        if (venta == null) return BadRequest();
        await _unitOfWork.SaveAsync();
        return _mapper.Map<VentaDTO>(venta);
    }

    [HttpGet]
    //[Authorize]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Pager<VentaDTO>>> Get([FromQuery] Params param)
    {
        var ventas = await _unitOfWork.Ventas.GetAllAsync(param.PageIndex, param.PageSize, param.Search);
        var lstVentas = _mapper.Map<List<VentaDTO>>(ventas.registros);
        return new Pager<VentaDTO>(lstVentas, ventas.totalRegistros, param.PageIndex, param.PageSize, param.Search);
    }

    [HttpGet("{id}")]
    //[Authorize]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<VentaDTO>> Get(int id)
    {
        var venta = await _unitOfWork.Ventas.GetByIdAsync(id);
        return _mapper.Map<VentaDTO>(venta);
    }

    [HttpDelete("{id}")]
    //[Authorize(Roles="Administrador")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Delete(int id)
    {
        var venta = await _unitOfWork.Ventas.GetByIdAsync(id);
        if (venta == null) BadRequest();
        _unitOfWork.Ventas.Remove(venta);
        await _unitOfWork.SaveAsync();
        return NoContent();
    }

}
