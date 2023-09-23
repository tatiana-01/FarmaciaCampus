using ApiProyecto.Dtos.Rol;
using ApiProyecto.Helpers;
using AutoMapper;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiProyecto.Controllers;
[ApiVersion("1.0")] //obtner los tipos de cargos de la persona
[ApiVersion("1.1")] //obtener las personas por el tipo de cargo y la paginacion y buscador
public class RolController : BaseApiControllerN
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper mapper;

    public RolController(IUnitOfWork unitOfWork, IMapper mapper)
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
    public async Task<ActionResult<List<RolDto>>> Get()
    {
        var roles = await _unitOfWork.Roles.GetAllAsync();
        return this.mapper.Map<List<RolDto>>(roles);
    }

    //METODO GET (Para obtener paginacion, registro y busqueda en la entidad)
    [HttpGet("Pagina")]
    [Authorize]
    [MapToApiVersion("1.1")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Pager<RolXusuarioDto>>> GetPaginaRolXusuario([FromQuery] Params rolParams)
    {
        var roles = await _unitOfWork.Roles.GetAllAsync(rolParams.PageIndex, rolParams.PageSize, rolParams.Search);

        var lstTipoPersonaDto = this.mapper.Map<List<RolXusuarioDto>>(roles.registros);

        return new Pager<RolXusuarioDto>(lstTipoPersonaDto, roles.totalRegistros, rolParams.PageIndex, rolParams.PageSize, rolParams.Search);
    }

    //METODO GET POR ID (Traer un solo registro de la entidad de la  Db)
    [HttpGet("{id}")]
    [Authorize]
    [MapToApiVersion("1.1")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<RolXusuarioDto>> GetByIdRolXusuario( int id)
    {
        var rol = await _unitOfWork.Roles.GetByIdAsync(id);

        if (rol == null) {
            return NotFound();
        }

        return this.mapper.Map<RolXusuarioDto>(rol);
    }

    //METODO POST (para enviar registros a la entidad de la Db)
    [HttpPost]
    //[Authorize(Roles = "Administrador")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<RolDto>> Post(RolDto rolDto)
    {
        var rol = this.mapper.Map<Rol>(rolDto);
        _unitOfWork.Roles.Add(rol);
        await _unitOfWork.SaveAsync();

        if (rol == null) {
            return BadRequest();
        }

        return this.mapper.Map<RolDto>(rol);
    }

    //METODO PUT (editar un registro de la entidad de la Db)
    [HttpPut("{id}")]
    [Authorize(Roles = "Administrador")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<RolDto>> Put(int id, [FromBody] RolDto rolDto)
    {
        if (rolDto == null) {
            return NotFound();
        }

        var rol = this.mapper.Map<Rol>(rolDto);
        rol.Id = id;
        _unitOfWork.Roles.Update(rol);
        await _unitOfWork.SaveAsync();

        return this.mapper.Map<RolDto>(rol);        
    }

    //METODO DELETE (Eliminar un registro de la entidad de la Db)
    [HttpDelete("{id}")]
    [Authorize(Roles = "Administrador")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<RolDto>> Delete(int id)
    {
        var rol = await _unitOfWork.Roles.GetByIdAsync(id);
        
        if (rol == null) {
            return NotFound();
        }

        _unitOfWork.Roles.Remove(rol);
        await _unitOfWork.SaveAsync();

        return NoContent();
    }

        
}
