using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dominio.Entities
{
    public class Ciudad:BaseEntity
    {
        public string Nombre { get; set; }
        public int DptoId { get; set; }
        public Departamento Departamento{ get; set; }
        public List<Direccion> Direcciones { get; set; } = new List<Direccion>();
    }
}