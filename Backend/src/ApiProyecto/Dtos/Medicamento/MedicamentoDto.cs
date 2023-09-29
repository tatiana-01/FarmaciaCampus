namespace ApiProyecto.Dtos.Medicamento;
public class MedicamentoDto
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public double Precio { get; set; }
    public int ProveedorId { get; set; }
    public int Stock { get; set; }
    public DateTime FechaExpiracion { get; set; }

    //public List<MedicamentoCompraDto> MedicamentosComprados { get; set; }
    //public List<MedicamentoVentaDto> MedicamentosVendidos { get; set; }
        
}
