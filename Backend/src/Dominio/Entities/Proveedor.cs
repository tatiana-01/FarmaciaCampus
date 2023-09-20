using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dominio.Entities
{
    public class Proveedor:Persona
    {
        public List<Compra> Compras { get; set; }=new List<Compra>();
        public List<Medicamento> Medicamentos { get; set; }=new List<Medicamento>();
    }
}