
using ApiProyecto.Dtos;
using ApiProyecto.Dtos.Usuario;
using ApiProyecto.Services;
using AutoMapper;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ApiProyecto.Controllers
{
    public class ProveedorController : BaseApiController
    {
        private readonly IUserService _userService;
        public ProveedorController(IUnitOfWork unitOfWork, IMapper mapper,IUserService userService) : base(unitOfWork, mapper){
            _userService = userService;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> PostProveedores(PersonaCreationDTO[] dtosPersona)
        {
            var nuevosProveedores = _mapper.Map<Proveedor[]>(dtosPersona);
            _unitOfWork.Proveedores.AddRange(nuevosProveedores);
            await _unitOfWork.SaveAsync();
            return Ok();
        }

        [HttpPost("register/{proveedorId:int}")]
        public async Task<ActionResult> CrearUsuarioAPaciente(int proveedorId,RegisterDto registerDto )
        {
            //Numero entero equivalente a la categoria de Proveedor nescesario para crear un usuario
            int opcionProveedor = 3;
            var result = await _userService.ResgisterAsync(registerDto,opcionProveedor,proveedorId);
            return Ok(result);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetAllProveedores()
        {
            var proveedores = await _unitOfWork.Proveedores.GetAllAsync();
            if (proveedores is null) return NotFound();
            var proveedoresMapeados = _mapper.Map<PersonaDTO[]>(proveedores);
            return Ok(
                new
                {
                    success = true,
                    message = "Ok",
                    result = proveedoresMapeados
                }
            );
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> EditProveedor(int id, PersonaDTO dtoPersona)
        {
            bool existeProveedor = _unitOfWork.Proveedores.Exist(e => e.Id == id);
            if(existeProveedor)
            {
                var proveedor = _mapper.Map<Proveedor>(dtoPersona);
                proveedor.Id = id;
                _unitOfWork.Proveedores.Update(proveedor);
                await _unitOfWork.SaveAsync();
                return Ok(proveedor);
            }
            else return NotFound();
        }
        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> DeleteProveedor(int id)
        {
            var filasAfectadas = await _unitOfWork.Proveedores.ExecuteDeleteAsync(e => e.Id == id);
            if (filasAfectadas == 0) return NotFound();

            return NoContent();
        }
       
    }
}