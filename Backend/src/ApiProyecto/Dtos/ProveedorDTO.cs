using ApiProyecto.Dtos.Usuario;

namespace ApiProyecto.Dtos;
public class ProveedorDTO
{
    public int Id { get; set; }
     public string NumIdentificacion { get; set; }
    public string Nombre { get; set; }
    public DateTime FechaNacimiento { get; set; }
    public string Correo { get; set; }
    public string Telefono { get; set; }
    public UsuarioDto Usuario { get; set; }
    public int ? DireccionId { get; set; }
    public DireccionDTO Direccion { get; set; }
        
}
