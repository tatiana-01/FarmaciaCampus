using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dominio.Entities
{
    public class Pais:BaseEntity
    {
        public string Nombre { get; set; }

        public List<Departamento> Departamentos { get; set; } = new List<Departamento>();
        
    }
}