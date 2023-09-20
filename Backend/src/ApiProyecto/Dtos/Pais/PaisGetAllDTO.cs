using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiProyecto.Dtos.Departamento;

namespace ApiProyecto.Dtos.Pais;
    public class PaisGetAllDTO
    {
        public int Id { get; set; }
        public string Nombre {get; set;}
        public ICollection<DepartamentoDTO> Departamentos {get;set;}
    }
