using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiProyecto.Dtos.Usuario;

namespace ApiProyecto.Dtos;
    public class EmpleadoGetAllDTO
    {
        public int Id {get; set;}
        public string NumIdentificacion { get; set; }
        public string Nombre { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string Correo { get; set; }
        public string Telefono { get; set; }
        public DireccionDTO Direccion { get; set; }
        public string EPS { get; set; }
        public string ARL { get; set; }
        public double Salario { get; set; }
        public string Cargo { get; set; }
        public DateTime FechaContratacion { get; set; }
        public UsuarioDto Usuario {get; set;}
         public List<VentaDTO> Ventas { get; set; } = new List<VentaDTO>();

    }
