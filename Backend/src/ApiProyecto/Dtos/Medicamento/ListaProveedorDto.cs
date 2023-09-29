
namespace ApiProyecto.Dtos.Medicamento;
public class ListaProveedorDto
{
    public string Nombre { get; set; }
    public string Telefono { get; set; }
    public List<NombreMedicamentoDto> Medicamentos { get; set; }
        
}
