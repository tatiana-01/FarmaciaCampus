using ApiProyecto.Dtos.Usuario;

namespace ApiProyecto.Dtos.Rol;
public class RolXusuarioDto
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public List<UsuarioDto> Usuarios { get; set; }
    //public List<UsuarioRolDto> UsuariosRoles { get; set; }
        
}
