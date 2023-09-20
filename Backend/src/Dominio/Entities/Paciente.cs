using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dominio.Entities
{
    public class Paciente:Persona
    {
        public List<Venta> Ventas {get; set;} = new List<Venta>(); 
        
    }
}