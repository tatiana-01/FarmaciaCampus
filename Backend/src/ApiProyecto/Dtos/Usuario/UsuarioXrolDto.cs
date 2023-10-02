
using ApiProyecto.Dtos.Rol;

namespace ApiProyecto.Dtos.Usuario;
public class UsuarioXrolDto
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public List<RolDto> Roles { get; set; }
    //public List<UsuarioRolDto> UsuariosRoles { get; set; }
        
}
