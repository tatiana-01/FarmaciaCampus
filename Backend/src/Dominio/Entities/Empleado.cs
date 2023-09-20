using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Dominio.Entities
{
    public class Empleado:Persona
    {
        public string EPS { get; set; }
        public string ARL { get; set; }
        public double Salario { get; set; }
        public string Cargo { get; set; }
        public DateTime FechaContratacion { get; set; }
        public List<Venta> Ventas { get; set; } = new List<Venta>();
        
    }
}