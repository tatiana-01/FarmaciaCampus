using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProyecto.Dtos;
    public class MedicamentoCompraPutDTO
    {
         //public int Id {get;set;}
        public int CompraId { get; set; }
        public int MedicamentoId { get; set; }
        public int CantidadComprada { get; set; }
        public double PrecioCompra { get; set; }
    }
