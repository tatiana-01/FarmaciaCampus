using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using ApiProyecto.Dtos.Usuario;
using Dominio.Entities;

namespace ApiProyecto.Services;
    public interface IUserService
    {
        Task<string> ResgisterAsync(RegisterDto model);
        Task<string> ResgisterAsync(RegisterDto registerDto, int opcionPersona, int personaId);
        Task<DatosUsuarioDto> GetTokenAsync (LoginDto model);
        Task<string> AddRolAsync(AddRolDto model);
        Task<Usuario> EditarUsuarioAsync(Usuario model);
    }
