using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dominio.Entities
{
    public class Persona:BaseEntity
    {
        public string NumIdentificacion { get; set; }
        public string Nombre { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string Correo { get; set; }
        public string Telefono { get; set; }
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
        public int DireccionId { get; set; }
        public Direccion Direccion { get; set; }

        
    }
}