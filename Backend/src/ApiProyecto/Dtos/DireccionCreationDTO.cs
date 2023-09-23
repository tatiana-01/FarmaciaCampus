using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProyecto.Dtos
{
    public class DireccionCreationDTO
    {
        public string TipoVia { get; set; }
        public int NumeroVia { get; set; }
        public string LetraVia { get; set; }
        public string SufijoCardinal { get; set; }
        public string Barrio { get; set; }
        public int CiudadId { get; set; }
        public string CodigoPostal { get; set; }
    }
}