using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProyecto.Dtos;
    public class VentaDTO
    {
        public int Id {get; set;}
        public DateTime FechaVenta { get; set; }
        public int PacienteId { get; set; }
        public int EmpleadoId { get; set; }
        public List<MedicamentoVentaDTO> MedicamentosVendidos { get; set; }=new List<MedicamentoVentaDTO>();
    }
