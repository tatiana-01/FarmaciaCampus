using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProyecto.Dtos
{
    public class EmpleadoCreationDTO
    {
        public string NumIdentificacion { get; set; }
        public string Nombre { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string Correo { get; set; }
        public string Telefono { get; set; }
        public DireccionCreationDTO Direccion { get; set; }
        public string EPS { get; set; }
        public string ARL { get; set; }
        public double Salario { get; set; }
        public string Cargo { get; set; }
        public DateTime FechaContratacion { get; set; }
    }
}