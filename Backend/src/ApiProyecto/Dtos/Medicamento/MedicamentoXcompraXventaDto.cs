namespace ApiProyecto.Dtos.Medicamento;
//using ApiProyecto.Dtos.MedicamentoCompra;
//using ApiProyecto.Dtos.MedicamentoVenta;
public class MedicamentoXcompraXventaDto
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public double Precio { get; set; }
    public int Stock { get; set; }
    public DateTime FechaExpiracion { get; set; }
    //public List<MedicamentoCompraDto> MedicamentosComprados { get; set; }
    //public List<MedicamentoVentaDto> MedicamentosVendidos { get; set; }
        
}
