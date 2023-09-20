using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiProyecto.Dtos.Ciudad;

namespace ApiProyecto.Dtos.Departamento;
    public class DepartamentoGetAllDTO
    {
        public int Id { get; set; }
        public string Nombre {get; set;}
        public int IdPais {get;set;}
        public ICollection<CiudadDTO> Ciudades {get;set;}
    }
