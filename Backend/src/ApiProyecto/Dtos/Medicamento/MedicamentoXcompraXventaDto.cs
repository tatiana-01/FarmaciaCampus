namespace ApiProyecto.Dtos.Medicamento;
using ApiProyecto.Dtos;
public class MedicamentoXcompraXventaDto
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public double Precio { get; set; }
    public int Stock { get; set; }
    public DateTime FechaExpiracion { get; set; }
    public List<MedicamentoCompraDTO> MedicamentosComprados { get; set; }
    public List<MedicamentoVentaDTO> MedicamentosVendidos { get; set; }
        
}
