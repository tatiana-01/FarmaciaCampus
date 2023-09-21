using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using ApiProyecto.Dtos;
using ApiProyecto.Services;
using AutoMapper;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ApiProyecto.Controllers;
    public class UsuariosController : BaseApiController
    {
       private readonly IUserService _userService;

    public UsuariosController(IUnitOfWork unitOfWork, IMapper mapper,IUserService userService) : base(unitOfWork, mapper)
    {
        _userService = userService;
    }

    [HttpPost("register")]
       public async Task<ActionResult> RegisterAsync(RegisterDto model){
        var result = await _userService.ResgisterAsync(model);
        return Ok(result);
       }

       [HttpPost("token")]
       public async Task<IActionResult> GetTokenAsync(LoginDto model){
        var result = await _userService.GetTokenAsync(model);
        return Ok(result);
       }

        [HttpPost("addrol")]
        public async Task<IActionResult> AddRolAsync(AddRolDto model){
            var result= await _userService.AddRolAsync(model);
            return Ok(result);
        }

        [HttpGet]
        [Authorize(Roles ="Gerente")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IEnumerable<Usuario>> Todos(){
            return await _unitOfWork.Usuarios.GetAllAsync();
        }

    }