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
        Task<DatosUsuarioDto> GetTokenAsync (LoginDto model);
        Task<string> AddRolAsync(AddRolDto model);
        Task<Usuario> EditarUsuarioAsync(Usuario model);
        Task<DatosUsuarioDto> RefreshTokenAsync(string refreshToken);
    }
