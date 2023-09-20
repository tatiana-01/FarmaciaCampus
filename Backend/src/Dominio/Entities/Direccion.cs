using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dominio.Entities
{
    public class Direccion : BaseEntity
    {
        public string TipoVia { get; set; }
        public int NumeroVia { get; set; }
        public string LetraVia { get; set; }
        public string SufijoCardinal { get; set; }
        public string Barrio { get; set; }
        public int CiudadId { get; set; }
        public Ciudad Ciudad {get; set;}
        public string CodigoPostal { get; set; }
        public List<Empleado> Empleados { get; set; } = new List<Empleado>();
        public List<Proveedor> Proveedores  { get; set; } = new List<Proveedor>();
        public List<Paciente> Pacientes { get; set; } = new List<Paciente>();
        
    }
}