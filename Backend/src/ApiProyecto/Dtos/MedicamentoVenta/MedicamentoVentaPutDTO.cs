using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProyecto.Dtos;
    public class MedicamentoVentaPutDTO
    {
        public int VentaId { get; set; }
        public int MedicamentoId { get; set; }
        public int CantidadVendida { get; set; }
        public double Precio { get; set; }
    }
