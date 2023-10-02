using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProyecto.Dtos;
    public class CompraPostDTO
    {
        public DateTime FechaCompra { get; set; }
        public int ProveedorId { get; set; }
        public List<MedicamentoCompraPostDTO> MedicamentosComprados { get; set; }=new List<MedicamentoCompraPostDTO>();
    }
