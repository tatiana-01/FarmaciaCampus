using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dominio.Entities;
    public class Usuario:BaseEntity
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public ICollection<Rol> Roles { get; set; } = new HashSet<Rol>();
        public ICollection<RefreshToken> RefreshTokens { get; set; } = new HashSet<RefreshToken>();
        public ICollection<UsuarioRol> UsuariosRoles { get; set; }
        public Empleado Empleado { get; set; }
        public Paciente Paciente { get; set; }
        public Proveedor Proveedor { get; set; }
    }
