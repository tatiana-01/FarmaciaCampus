using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProyecto.Dtos;
    public class CompraPutDTO
    {
        public DateTime FechaCompra { get; set; }
        public int ProveedorId { get; set; }
        public List<MedicamentoCompraDTO> MedicamentosComprados { get; set; }=new List<MedicamentoCompraDTO>();
    }
