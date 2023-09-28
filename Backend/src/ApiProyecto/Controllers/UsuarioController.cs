using ApiProyecto.Dtos.Usuario;
using ApiProyecto.Helpers;
using ApiProyecto.Services;
using AutoMapper;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiProyecto.Controllers;
public class UsuariosController : BaseApiControllerN
{
    private readonly IUserService _userService;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper mapper;

    public UsuariosController(IUnitOfWork unitOfWork, IMapper mapper,IUserService userService)
    {
        _userService = userService;
        this.mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> RegisterAsync(RegisterDto model){
        var result = await _userService.ResgisterAsync(model);
        return Ok(result);
    }

    //METODO POST PARA OBTENER EL TOKEN 
    [HttpPost("token")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetTokenAsync(LoginDto model){
        var result = await _userService.GetTokenAsync(model);
        SetRefreshTokenInCookie(result.RefreshToken); //activar la cookie con el refreshToken
        return Ok(result);
    }

    //METODO POST PARA AÑADIR UN ROL 
    [HttpPost("addrol")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> AddRolAsync(AddRolDto model){
        var result= await _userService.AddRolAsync(model);
        return Ok(result);
    }

    //METODO POST PARA OBTENER EL REFRESTOKEN Y ACTUALIZARLO
    [HttpPost("refresh-token")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> RefreshToken()
    {
        var refreshToken = Request.Cookies["refreshToken"];
        var response = await _userService.RefreshTokenAsync(refreshToken);
        
        if (!string.IsNullOrEmpty(response.RefreshToken))
            SetRefreshTokenInCookie(response.RefreshToken);

        return Ok(response);
    }

    private void SetRefreshTokenInCookie(string refreshToken)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Expires = DateTime.UtcNow.AddDays(10),
        };
        Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
    }

    //METODO GET PARA OBTENER LOS USUARIOS REGISTRADOS
    [HttpGet]
    //[Authorize(Roles ="Empleado")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<UsuarioDto>>> GetTodos()
    {
        var usuarios = await _unitOfWork.Usuarios.GetAllAsync();
        return this.mapper.Map<List<UsuarioDto>>(usuarios);
    }

    //METODO GET (OBTENER LOS USUARIOS CON SU ROL)
    [HttpGet("UsuarioXrol")]
    [Authorize(Roles = "Administrador")]
    [MapToApiVersion("1.1")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<UsuarioXrolDto>>> GetUsuarioXrol()
    {
        var usuariosRoles = await _unitOfWork.Usuarios.GetAllAsync();
        return this.mapper.Map<List<UsuarioXrolDto>>(usuariosRoles);
    }

    //METODO GET POR ID (TRAER UN UNICO REGISTRO CON SUS ROLES)
    [HttpGet("{id}")]
    //[Authorize(Roles = "Administrador")]
    [MapToApiVersion("1.1")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UsuarioXrolDto>> Get(int id)
    {
        var usuarioXrol = await _unitOfWork.Usuarios.GetByIdAsync(id);

        if (usuarioXrol == null) {
            return NotFound();
        }

        return this.mapper.Map<UsuarioXrolDto>(usuarioXrol);
    }

    //METODO GET (Para obtener paginacion, registro y busqueda en la entidad)
    [HttpGet("Pagina")]
    [Authorize(Roles = "Administrador")]
    [MapToApiVersion("1.1")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Pager<UsuarioXrolDto>>> GetTodoPagina([FromQuery] Params usuarioParams)
    {
        var usuariosXroles = await _unitOfWork.Usuarios.GetAllAsync(usuarioParams.PageIndex, usuarioParams.PageSize, usuarioParams.Search);
        var lstUsuarioXrolDto = this.mapper.Map<List<UsuarioXrolDto>>(usuariosXroles.registros);

        return new Pager<UsuarioXrolDto>(lstUsuarioXrolDto, usuariosXroles.totalRegistros, usuarioParams.PageIndex, usuarioParams.PageSize, usuarioParams.Search);
    }

    //METOD PUT PARA EDITAR UN USUARIO 
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UsuarioDto>> Put(int id, [FromBody] UsuarioDto usuarioDto)
    {
        if (usuarioDto == null) {
            return NotFound();
        }
        var usuario = this.mapper.Map<Usuario>(usuarioDto);
        usuario.Id = id;
        var editUsuarioRol = await _userService.EditarUsuarioAsync(usuario);

        return this.mapper.Map<UsuarioDto>(editUsuarioRol);
    }

    //METODO DELETE (ELIMINAR USUARIO REGISTRADO)
    [HttpDelete("{id}")]
    //[Authorize(Roles = "Administrador")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UsuarioDto>> DeleteUsuario(int id)
    {
        var usuario = await _unitOfWork.Usuarios.GetByIdAsync(id);

        if(usuario == null) {
            return NotFound();
        }

        _unitOfWork.Usuarios.Remove(usuario);
        await _unitOfWork.SaveAsync();
        return NoContent();
    }

}