using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using ApiProyecto.Dtos.Usuario;
using ApiProyecto.Helpers;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace ApiProyecto.Services;
public class UserService : IUserService
{
    private readonly JWT _jwt;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IPasswordHasher<Usuario> _passwordHasher;
    //private readonly IJwtGenerador _jwtGenerador;

    public UserService(IUnitOfWork unitOfWork, IOptions<JWT> jwt, IPasswordHasher<Usuario> passwordHasher /*, IJwtGenerador jwtGenerador */)
    {
        _jwt = jwt.Value;
        _unitOfWork = unitOfWork;
        _passwordHasher = passwordHasher;
        // _jwtGenerador = jwtGenerador;
    }
    public async Task<string> ResgisterAsync(RegisterDto registerDto)
    {
        var usuario = new Usuario
        {

            Email = registerDto.Email,
            Username = registerDto.Username,

        };

        usuario.Password = _passwordHasher.HashPassword(usuario, registerDto.Password);

        var usuarioExiste = _unitOfWork.Usuarios
                                    .Find(u => u.Username.ToLower() == registerDto.Username.ToLower())
                                    .FirstOrDefault();

        if (usuarioExiste == null)
        {
            var rolPredeterminado = _unitOfWork.Roles
                                    .Find(u => u.Nombre == Autorizacion.rol_predeterminado.ToString())
                                    .First();
            try
            {
                usuario.Roles.Add(rolPredeterminado);
                _unitOfWork.Usuarios.Add(usuario);
                await _unitOfWork.SaveAsync();

                return $"El usuario  {registerDto.Username} ha sido registrado exitosamente";
            }
            catch (Exception ex)
            {
                var message = ex.Message;
                return $"Error: {message}";
            }
        }
        else
        {
            return $"El usuario con {registerDto.Username} ya se encuentra registrado.";
        }
    }

    public async Task<string> AddRolAsync(AddRolDto model)
    {
        var usuario = await _unitOfWork.Usuarios
                    .GetByUsernameAsync(model.Username);
        if (usuario == null)
        {
            return $"No existe algún usuario registrado con la cuenta {model.Username}.";
        }
        var resultado = _passwordHasher.VerifyHashedPassword(usuario, usuario.Password, model.Password);
        if (resultado == PasswordVerificationResult.Success)
        {
            var rolExiste = _unitOfWork.Roles
                                        .Find(u => u.Nombre.ToLower() == model.Role.ToLower())
                                        .FirstOrDefault();
            if (rolExiste != null)
            {
                var usuarioTieneRol = usuario.Roles
                                            .Any(u => u.Id == rolExiste.Id);

                if (usuarioTieneRol == false)
                {
                    usuario.Roles.Add(rolExiste);
                    _unitOfWork.Usuarios.Update(usuario);
                    await _unitOfWork.SaveAsync();
                }
                return $"Rol {model.Role} agregado a la cuenta {model.Username} de forma exitosa.";
            }
            return $"Rol {model.Role} no encontrado.";
        }
        return $"Credenciales incorrectas para el usuario {usuario.Username}.";
    }

    public async Task<DatosUsuarioDto> GetTokenAsync(LoginDto model)
    {
        DatosUsuarioDto datosUsuarioDto = new DatosUsuarioDto();
        var usuario = await _unitOfWork.Usuarios
                    .GetByUsernameAsync(model.Username);
        if (usuario == null)
        {
            datosUsuarioDto.EstaAutenticado = false;
            datosUsuarioDto.Mensaje = $"No existe ningún usuario con el username {model.Username}.";
            return datosUsuarioDto;
        }

        var result = _passwordHasher.VerifyHashedPassword(usuario, usuario.Password, model.Password);
        if (result == PasswordVerificationResult.Success)
        {

            datosUsuarioDto.Mensaje = "Ok";
            datosUsuarioDto.EstaAutenticado = true;
            JwtSecurityToken jwtSecurityToken = CreateJwtToken(usuario);
            datosUsuarioDto.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
            datosUsuarioDto.UserName = usuario.Username;
            datosUsuarioDto.Email = usuario.Username;
            datosUsuarioDto.Roles = usuario.Roles
                                                .Select(p => p.Nombre)
                                                .ToList();

            if (usuario.RefreshTokens.Any(p => p.IsActive))
            {
                var activeRefreshToken = usuario.RefreshTokens.Where(p => p.IsActive == true).FirstOrDefault();
                datosUsuarioDto.RefreshToken = activeRefreshToken.Token;
                datosUsuarioDto.RefreshTokenExpiration = activeRefreshToken.Expires;
            }
            else 
            {
                var refreshToken = CreateRefreshToken();
                datosUsuarioDto.RefreshToken = refreshToken.Token;
                datosUsuarioDto.RefreshTokenExpiration = refreshToken.Expires;
                usuario.RefreshTokens.Add(refreshToken);
                _unitOfWork.Usuarios.Update(usuario);
                await _unitOfWork.SaveAsync();
            }
            return datosUsuarioDto;

        }
        datosUsuarioDto.EstaAutenticado = false;
        datosUsuarioDto.Mensaje = $"Credenciales incorrectas para el usuario {usuario.Username}.";
        return datosUsuarioDto;
    }

    //ACTUALIZACION DEL TOKEN POR MEDIO DEL REFRESHTOKEN
    public async Task<DatosUsuarioDto> RefreshTokenAsync(string refreshToken)
    {
        var datosUsuarioDto = new DatosUsuarioDto();

        var usuario = await _unitOfWork.Usuarios.GetByRefreshTokenAsync(refreshToken);

        if (usuario == null)
        {
            datosUsuarioDto.EstaAutenticado = false;
            datosUsuarioDto.Mensaje = $"El token no esta asignado a ningun usuario.";
            return datosUsuarioDto;
        }

        var refreshTokenBd = usuario.RefreshTokens.Single(p => p.Token == refreshToken);

        if (!refreshTokenBd.IsActive)
        {
            datosUsuarioDto.EstaAutenticado = false;
            datosUsuarioDto.Mensaje = $"El token no es valido";
            return datosUsuarioDto;
        }

        //Revocando el actual RefreshToken 
        refreshTokenBd.Revoked = DateTime.UtcNow;

        //Generando un nuevo refreshToken y guardarlo en la base de datos 
        var newRefreshToken = CreateRefreshToken();
        usuario.RefreshTokens.Add(newRefreshToken);
        _unitOfWork.Usuarios.Update(usuario);
        await _unitOfWork.SaveAsync();

        //Generando un nuevo Json Web Token 
        datosUsuarioDto.Mensaje = "Ok";
        datosUsuarioDto.EstaAutenticado = true;
        JwtSecurityToken jwtSecurityToken = CreateJwtToken(usuario);
        datosUsuarioDto.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
        datosUsuarioDto.UserName = usuario.Username;
        datosUsuarioDto.Email = usuario.Username;
        datosUsuarioDto.Roles = usuario.Roles
                                            .Select(p => p.Nombre)
                                            .ToList();

        
        datosUsuarioDto.RefreshToken = newRefreshToken.Token;
        datosUsuarioDto.RefreshTokenExpiration = newRefreshToken.Expires;
        return datosUsuarioDto;
    }

    //CREAMOS EL REFRESTOKEN 
    public RefreshToken CreateRefreshToken()
    {
        var randomNumber = new byte[32];
        using (var generator = RandomNumberGenerator.Create())
        {
            generator.GetBytes(randomNumber);
            return new RefreshToken
            {
                Token = Convert.ToBase64String(randomNumber),
                Expires = DateTime.UtcNow.AddDays(10),
                Created = DateTime.UtcNow
            };
        }
    }

    private JwtSecurityToken CreateJwtToken(Usuario usuario)
    {
        var roles = usuario.Roles;
        var roleClaims = new List<Claim>();
        foreach (var role in roles)
        {
            roleClaims.Add(new Claim("roles", role.Nombre));
        }
        var claims = new[]
        {
                                new Claim(JwtRegisteredClaimNames.Sub, usuario.Username),
                                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                                new Claim(JwtRegisteredClaimNames.Email, usuario.Email),
                                new Claim("uid", usuario.Id.ToString())
                        }
        .Union(roleClaims);
        var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
        Console.WriteLine("", symmetricSecurityKey);
        var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
        var jwtSecurityToken = new JwtSecurityToken(
            issuer: _jwt.Issuer,
            audience: _jwt.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_jwt.DurationInMinutes),
            signingCredentials: signingCredentials
        );
        return jwtSecurityToken;
    }

    //EDITAR EL USUARIO REGISTRADO
    public async Task<Usuario> EditarUsuarioAsync(Usuario model)
    {
        Usuario usuario = new Usuario();
        usuario.Password = _passwordHasher.HashPassword(usuario, model.Password);
        _unitOfWork.Usuarios.Update(usuario);
        await _unitOfWork.SaveAsync();
        return usuario;
    }
//Metodo para crear un Usuario a partir dl tipo de persona que se registra (Proveedor/Paciente/Empleado)
    public async Task<string> ResgisterAsync(RegisterDto registerDto, int opcionPersona, int personaId)
    {
        var usuario = new Usuario
        {
            Email = registerDto.Email,
            Username = registerDto.Username,
        };

        usuario.Password = _passwordHasher.HashPassword(usuario, registerDto.Password);

        var usuarioExiste = _unitOfWork.Usuarios
                                    .Find(u => u.Username.ToLower() == registerDto.Username.ToLower())
                                    .FirstOrDefault();

        if (usuarioExiste == null)
        {
            var rolPredeterminado = _unitOfWork.Roles
                                    .Find(u => u.Nombre == Autorizacion.rol_predeterminado.ToString())
                                    .First();
            try
            {

                usuario.Roles.Add(rolPredeterminado);
                AsignarPersonaAUsuario(opcionPersona,personaId,usuario);
                _unitOfWork.Usuarios.Add(usuario);
                //await _unitOfWork.SaveAsync();
                
                await _unitOfWork.SaveAsync();

                return $"El usuario  {registerDto.Username} ha sido registrado exitosamente";
            }
            catch (Exception ex)
            {
                var message = ex.Message;
                return $"Error: {message}";
            }
        }
        else
        {
            return $"El usuario con {registerDto.Username} ya se encuentra registrado.";
        }
    }
    //Funcion que agrega al nuevo Objeto de Usuario la persona correspondiente
    public  void AsignarPersonaAUsuario(int opcionPersona, int personaId, Usuario usuario)
    {
        switch (opcionPersona)
                {
                    case 1:
                        var empleado = _unitOfWork.Empleados.GetById(x =>x.Id == personaId);
                        if(empleado is null) throw new Exception($"El empleado con ID {personaId} no existe");
                        usuario.Empleado = empleado;
                        break;
                    case 2:
                        var paciente = _unitOfWork.Pacientes.GetById(x =>x.Id == personaId);
                        if(paciente is null) throw new Exception($"El paciente con ID {personaId} no existe");
                        usuario.Paciente = paciente;
                        break;
                    case 3:
                        var proveedor = _unitOfWork.Proveedores.GetById(x =>x.Id == personaId);
                        if(proveedor is null) throw new Exception($"El proveedor con ID {personaId} no existe");
                        usuario.Proveedor = proveedor;
                        break;
                    default:
                        throw new Exception("Opcion no es valida");
                }

    }

    
    /* public async Task<LoginDto>  UserLogin(LoginDto model)
    {
        var usuario = await _unitOfWork.Usuarios.GetByUsernameAsync(model.Username);
        var resultado = _passwordHasher.VerifyHashedPassword(usuario, usuario.Password, model.Password);

        if (resultado == PasswordVerificationResult.Success)
        {
            return model;
        }
        return null;
    } */

}

 