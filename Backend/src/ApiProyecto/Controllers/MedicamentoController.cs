using ApiProyecto.Dtos;
using ApiProyecto.Dtos.Medicamento;
using ApiProyecto.Helpers;
using AutoMapper;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace ApiProyecto.Controllers;
[ApiVersion("1.0")] //obtner los Medicamentos
[ApiVersion("1.1")] //obtener las comprar y ventas de medicamentos y la paginacion y buscador
public class MedicamentoController : BaseApiControllerN
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
    //[Authorize]
    //[MapToApiVersion("1.1")]
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
    //[Authorize]
    //[MapToApiVersion("1.1")]
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
    //[Authorize(Roles = "Administrador")]
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
        if (string.IsNullOrEmpty(medicamento))
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

    [HttpGet("medicamentosMenosde50Unidades")]
    public async Task<ActionResult> GetMedicamentosMenos50Unidades()
    {
        var medicamentos = _unitOfWork.Medicamentos.Find(x =>x.Stock < 50);
        if(medicamentos is null) return NotFound();
        var result = medicamentos.Select(m =>new{
            m.Id,
            m.Nombre,
            m.Precio,
            m.FechaExpiracion,
            m.Stock,
            m.ProveedorId
        });
        return Ok(result);
    }

    //Obtener medicamentos por proveedor
    [HttpGet("proveedor/{proveedor}")]
    //[Authorize]
    //[MapToApiVersion("1.1")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IEnumerable<MedicamentoDto>>> GetMedsByProveedor( string proveedor)
    {
        var medicamentos = await _unitOfWork.Medicamentos.GetMedicamentosByProveedor(proveedor);
        if (medicamentos==null) return NotFound("No se encontro el proveedor");
        var medicamentosDTO=mapper.Map<IEnumerable<MedicamentoDto>>(medicamentos);
        return Ok(medicamentosDTO);
    }

    //Obtener medicamentos vencen antes del 1 de enero de 2024.
    [HttpGet("vencenantesde2024")]
    //[Authorize]
    //[MapToApiVersion("1.1")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<IEnumerable<MedicamentoDto>> GetMedsexpiresBefore2024( )
    {
        var medicamentos = _unitOfWork.Medicamentos.Find(p=>p.FechaExpiracion.CompareTo(new DateTime(2024,01,01))<0);
        if (medicamentos.IsNullOrEmpty()) return NotFound("No se encontraron medicamentos con fecha de expiracion anterior a 1 de Enero de 2024");
        var medicamentosDTO=mapper.Map<IEnumerable<MedicamentoDto>>(medicamentos);
        return Ok(medicamentosDTO);
    }

      //Obtener medicamentos que no se han vendidos.
    [HttpGet("novendidos")]
    //[Authorize]
    //[MapToApiVersion("1.1")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<IEnumerable<MedicamentoDto>> GetMedsNoVendidos( )
    {
        var medicamentos = _unitOfWork.Medicamentos.Find(p=>p.Stock>0);
        if (medicamentos.IsNullOrEmpty()) return NotFound("Todos los medicamentos se han vendido");
        var medicamentosDTO=mapper.Map<IEnumerable<MedicamentoDto>>(medicamentos);
        return Ok(medicamentosDTO);
    }

    //menos vendido en 2023
    [HttpGet("menosvendido2023")]
    //[Authorize]
    //[MapToApiVersion("1.1")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<IEnumerable<object>> GetMenosVendido( )
    {
        var medicamentos = _unitOfWork.Medicamentos.GetMenosVendido();
        if (medicamentos==null) return NotFound("No se encontraron medicamentos");
        return Ok(medicamentos);
    }

     //medicamentos nunca vendidos
    [HttpGet("nuncaVendido")]
    //[Authorize]
    //[MapToApiVersion("1.1")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<IEnumerable<MedicamentoDto>> GetNuncaVendido( )
    {
        var medicamentos = _unitOfWork.Medicamentos.GetNuncaVendido();
        if (medicamentos.IsNullOrEmpty()) return NotFound("No se encontraron medicamentos");
        return Ok(this.mapper.Map<IEnumerable<MedicamentoDto>>(medicamentos.AsEnumerable()));
    }

    //CONSULTA PAA DETERMINAR LOS MEDICAMENTOS CON UN PRECIO MAYOA A Y UN STOCK MENOR A 
    [HttpGet("MedicMayorPrecioMenorStock/{mayorPrecio}/{menorStock}")]
    //[Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<MedicamentoDto>>> GetMedicamentoPrecioStock(Double mayorPrecio, int menorStock)
    {
        var lstMedicamentos = await _unitOfWork.Medicamentos.GetAllMedicamentosMayorPrecioMenorStock(mayorPrecio, menorStock);

        if (lstMedicamentos == null)
        {
            throw new UnauthorizedAccessException("No se encontro ningun medicamento con esas expecificaciones");
        }

        return this.mapper.Map<List<MedicamentoDto>>(lstMedicamentos);
    }

     




}
