using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProyecto.Dtos;
    public class VentaPutDTO
    {
         public DateTime FechaVenta { get; set; }
        public int PacienteId { get; set; }
        public int EmpleadoId { get; set; }
        public List<MedicamentoVentaPutDTO> MedicamentosVendidos { get; set; }=new List<MedicamentoVentaPutDTO>();
    }
