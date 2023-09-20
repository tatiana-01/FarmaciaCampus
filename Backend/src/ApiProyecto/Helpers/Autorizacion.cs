using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProyecto.Helpers;
    public class Autorizacion
    {
        public enum Roles
    {
        Administrador,
        Gerente,
        Empleado
    }
    public const Roles rol_predeterminado = Roles.Empleado;
    }
