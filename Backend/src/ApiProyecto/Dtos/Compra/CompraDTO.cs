using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProyecto.Dtos;
    public class CompraDTO
    {
        public int Id {get; set;}
        public DateTime FechaCompra { get; set; }
        public int ProveedorId { get; set; }
        public List<MedicamentoCompraDTO> MedicamentosComprados { get; set; }=new List<MedicamentoCompraDTO>();
    }
