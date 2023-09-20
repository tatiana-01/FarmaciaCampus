using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dominio.Entities
{
    public class Medicamento:BaseEntity
    {
        public string Nombre { get; set; }
        public double Precio { get; set; }
        public int Stock { get; set; }
        //public string UnidadMedida { get; set; }
        public DateTime FechaExpiracion { get; set; }
        public int ProveedorId { get; set; }
        public Proveedor Proveedor { get; set; }
        public List<MedicamentoCompra> MedicamentosComprados { get; set; }=new List<MedicamentoCompra>();
        public List<MedicamentoVenta> MedicamentosVendidos { get; set; }=new List<MedicamentoVenta>();
    
    }
}