using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProyecto.Dtos;
    public class VentaPostDTO
    {
         public DateTime FechaVenta { get; set; }
        public int PacienteId { get; set; }
        public int EmpleadoId { get; set; }
        public List<MedicamentoVentaPostDTO> MedicamentosVendidos { get; set; }=new List<MedicamentoVentaPostDTO>();
    }
