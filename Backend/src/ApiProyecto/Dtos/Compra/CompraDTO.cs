
namespace ApiProyecto.Dtos;
public class CompraDTO
{
    public int Id {get; set;}
    public DateTime FechaCompra { get; set; }
    public int ProveedorId { get; set; }
    public ProveedorDTO Proveedor { get; set; } 
    public List<MedicamentoCompraDTO> MedicamentosComprados { get; set; }=new List<MedicamentoCompraDTO>();
}
