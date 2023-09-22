using ApiProyecto.Dtos.Medicamento;
using ApiProyecto.Helpers;
using AutoMapper;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiProyecto.Controllers;
[ApiVersion("1.0")] //obtner los Medicamentos
[ApiVersion("1.1")] //obtener las comprar y ventas de medicamentos y la paginacion y buscador
public class MedicamentoController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper mapper;

    public MedicamentoController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        this.mapper = mapper;
    }

    //METODO GET (obtener todos los registros)
    [HttpGet]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<MedicamentoDto>>> Get()
    {
        var medicamentos = await _unitOfWork.Medicamentos.GetAllAsync();
        return this.mapper.Map<List<MedicamentoDto>>(medicamentos);
    }

    //METODO GET (Para obtener paginacion, registro y busqueda en la entidad)
    [HttpGet("Pagina")]
    [Authorize]
    [MapToApiVersion("1.1")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Pager<MedicamentoXcompraXventaDto>>> GetPaginaMedicXcompXvent([FromQuery] Params medicParams)
    {
        var medicamentos = await _unitOfWork.Medicamentos.GetAllAsync(medicParams.PageIndex, medicParams.PageSize, medicParams.Search);

        var lstMedicCompVent = this.mapper.Map<List<MedicamentoXcompraXventaDto>>(medicamentos.registros);

        return new Pager<MedicamentoXcompraXventaDto>(lstMedicCompVent, medicamentos.totalRegistros, medicParams.PageIndex, medicParams.PageSize, medicParams.Search);
    }

    //METODO GET POR ID (Traer un solo registro de la entidad de la  Db)
    [HttpGet("{id}")]
    [Authorize]
    [MapToApiVersion("1.1")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<MedicamentoXcompraXventaDto>> GetByIdMedicCompVent( int id)
    {
        var medicamento = await _unitOfWork.Medicamentos.GetByIdAsync(id);

        if (medicamento == null) {
            return NotFound();
        }

        return this.mapper.Map<MedicamentoXcompraXventaDto>(medicamento);
    }

    //METODO POST (para enviar registros a la entidad de la Db)
    [HttpPost]
    [Authorize(Roles = "Administrador")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<MedicamentoDto>> Post(MedicamentoDto medicamentoDto)
    {
        var medicamento = this.mapper.Map<Medicamento>(medicamentoDto);
        _unitOfWork.Medicamentos.Add(medicamento);
        await _unitOfWork.SaveAsync();

        if (medicamento == null) {
            return BadRequest();
        }

        return this.mapper.Map<MedicamentoDto>(medicamento);
    }

    //METODO PUT (editar un registro de la entidad de la Db)
    [HttpPut("{id}")]
    [Authorize(Roles = "Administrador")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<MedicamentoDto>> Put(int id, [FromBody] MedicamentoDto medicamentoDto)
    {
        if (medicamentoDto == null) {
            return NotFound();
        }

        var medicamento = this.mapper.Map<Medicamento>(medicamentoDto);
        medicamento.Id = id;
        _unitOfWork.Medicamentos.Update(medicamento);
        await _unitOfWork.SaveAsync();

        return this.mapper.Map<MedicamentoDto>(medicamento);        
    }

    //METODO DELETE (Eliminar un registro de la entidad de la Db)
    [HttpDelete("{id}")]
    [Authorize(Roles = "Administrador")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<MedicamentoDto>> Delete(int id)
    {
        var medicamento = await _unitOfWork.Medicamentos.GetByIdAsync(id);
        
        if (medicamento == null) {
            return NotFound();
        }

        _unitOfWork.Medicamentos.Remove(medicamento);
        await _unitOfWork.SaveAsync();

        return NoContent();
    }

    //CONSULTA PARA GENERAR LA LISTA DE PROVEEDORES CON SU TELEFONO Y MEDICAMENTOS
    [HttpGet("LstProveedores")]
    //[Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<ListaProveedorDto>>> GetListaProveedor()
    {
        var lstProveedores = await _unitOfWork.Medicamentos.GetAllProveedorContacto();
        return this.mapper.Map<List<ListaProveedorDto>>(lstProveedores);
    }

    //CONSULTA PARA OBTENER EL TOTAL DE LAS VENTAS DE UN MEDICAMENTO
    [HttpGet("TotalVentasMeidc/{medicamento}")]
    //[Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<TotalVentaMedicDto>> GetTotalVentaMedic(string medicamento)
    {
        if (!string.IsNullOrEmpty(medicamento))
        {
            throw new UnauthorizedAccessException("ingrese un medicamento a buscar");
        }

        TotalVentaMedicDto totalVentaMedicDto = new TotalVentaMedicDto();
        var lstVentaMedicamento = await _unitOfWork.Medicamentos.GetByNombreMedicamento(medicamento);

        if (lstVentaMedicamento == null)
        {
            throw new UnauthorizedAccessException("No se encontro el medicamento, revise el nombre");
        }

        var PrecioVentas = 0.0;
        var TotalVendidos = 0;
        foreach (var item in lstVentaMedicamento.MedicamentosVendidos)
        {
            PrecioVentas += item.Precio;
            TotalVendidos += item.CantidadVendida;
        }
        totalVentaMedicDto.Id = lstVentaMedicamento.Id;
        totalVentaMedicDto.Nombre = lstVentaMedicamento.Nombre;
        totalVentaMedicDto.TotalVendidos = TotalVendidos;
        totalVentaMedicDto.PrecioVenta = PrecioVentas;

        return this.mapper.Map<TotalVentaMedicDto>(totalVentaMedicDto);
    }

}
