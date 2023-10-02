using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiProyecto.Dtos.Ciudad;
using ApiProyecto.Dtos.Pais;

namespace ApiProyecto.Dtos.Departamento;
    public class DepartamentoGetAllDTO
    {
        public int Id { get; set; }
        public string Nombre {get; set;}
        public int PaisId {get;set;}
         public PaisDTO Pais{get;set;}
        public ICollection<CiudadDTO> Ciudades {get;set;}
    }
