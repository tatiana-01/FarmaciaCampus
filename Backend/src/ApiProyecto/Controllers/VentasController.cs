using System.Runtime.CompilerServices;
using ApiProyecto.Dtos;
using ApiProyecto.Dtos.Venta;
using ApiProyecto.Helpers;
using AutoMapper;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiProyecto.Controllers;
[ApiVersion("1.0")]
public class VentasController : BaseApiControllerN
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
        var venta = _mapper.Map<Venta>(VentaDTO);
        foreach (var item in venta.MedicamentosVendidos)
        {
            var medicamento = _unitOfWork.Medicamentos.GetByIdAsync(item.MedicamentoId);
            if (medicamento.Result.Stock < item.CantidadVendida) return BadRequest(
                new
                {
                    mensaje = "No hay suficientes unidades en stock"
                }
            );
            medicamento.Result.Stock -= item.CantidadVendida;
            item.Precio=medicamento.Result.Precio*item.CantidadVendida;
        }
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

    //CONSULTA PARA DETERMINAR EL TOTAL DE MEDICAMENTOS VENDIDOS DURANTE UNA FECHA 
    [HttpGet("TotalMedicamentosVendidos/{fecha}")]
    //[Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<TotalMedicVendidosDTO>> GetTotalMedicamentosVendidos(DateTime fecha)
    {
        var lstaMedicamentosVendidosFecha = await _unitOfWork.Ventas.GetAllMedicamentoPorFechaAsync(fecha);

        if ((lstaMedicamentosVendidosFecha.Count() == 0) || (lstaMedicamentosVendidosFecha == null))
        {
            throw new UnauthorizedAccessException("No se encontro ningun medicamento dentro de esa fecha");
        }

        TotalMedicVendidosDTO totalMedicVendidosDTO = new();
        var numerosMedic = 0;
        foreach (var lstVentas in lstaMedicamentosVendidosFecha)
        {
            foreach (var medic in lstVentas.MedicamentosVendidos)
            {
                numerosMedic += medic.CantidadVendida;
            }
        }
        totalMedicVendidosDTO.TotalDeMedicamentosVendidos = numerosMedic;

        return _mapper.Map<TotalMedicVendidosDTO>(totalMedicVendidosDTO);
    }

    //CONSULTA PARA DETERMINAR LOS EMPLEADOS CON MAYORES VENTAS REALIZADAS
    [HttpGet("EmpleadosConMasVentasEchas/{numeroDeVentas}")]
    //[Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<EmpleadosMasVentasDTO>>> GetEmpleadosConVentas(int numeroDeVentas)
    {
        if (int.IsNegative(numeroDeVentas))
        {
            throw new UnauthorizedAccessException("El numero ingresado de ventas no corresponde a un numero entero positivo");
        }

        var lstEmpleadosMasVentas = await _unitOfWork.Ventas.GetAllEmpleadoMasVentasAsync(numeroDeVentas);

        if ((lstEmpleadosMasVentas.Count() == 0) || (lstEmpleadosMasVentas == null))
        {
            throw new UnauthorizedAccessException("No se encontro ningun empleado con ese numero de ventas");
        }

        List<EmpleadosMasVentasDTO> empleadosMasVentas = new();
        foreach (var lstEmpleados in lstEmpleadosMasVentas)
        {
            EmpleadosMasVentasDTO empleadosMasVentasDTO = new()
            {
                Id = lstEmpleados.Id,
                Nombre = lstEmpleados.Nombre,
                Cargo = lstEmpleados.Cargo,
                NumeroDeVentasRealizadas = lstEmpleados.Ventas.Count()
            };
            empleadosMasVentas.Add(empleadosMasVentasDTO);
        }

        return _mapper.Map<List<EmpleadosMasVentasDTO>>(empleadosMasVentas);
    }

    //CONSULTA PARA DETERMONAR LOS EMPLEADOS QUE NO HAN ECHO NINGUNA VENTA DURANTE UN DETERMINADO AÑO
    [HttpGet("EmpleadosSinVentasEchas/{fecha}")]
    //[Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<EmpleadosSinVentasDTO>>> GetEmpleadosSinVentas(DateTime fecha)
    {
        var lstEmpleadosSinVentas = await _unitOfWork.Ventas.GetAllEmpleadoSinVentasAsync(fecha);

        if ((lstEmpleadosSinVentas.Count() == 0) || (lstEmpleadosSinVentas == null))
        {
            throw new UnauthorizedAccessException("No se encontro ningun empleado para el año ingresado");
        }

        List<EmpleadosSinVentasDTO> empleadosSinVentas = new();
        foreach (var lstEmpleados in lstEmpleadosSinVentas)
        {
            EmpleadosSinVentasDTO empleadosSinVentasDTO = new()
            {
                Id = lstEmpleados.Id,
                Nombre = lstEmpleados.Nombre,
                Cargo = lstEmpleados.Cargo,
                NumeroDeVentasRealizadas = 0
            };
            empleadosSinVentas.Add(empleadosSinVentasDTO);
        }

        return _mapper.Map<List<EmpleadosSinVentasDTO>>(empleadosSinVentas);
    }


}
