
using ApiProyecto.Dtos;
using ApiProyecto.Dtos.Usuario;
using ApiProyecto.Services;
using AutoMapper;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ApiProyecto.Controllers
{
    public class EmpleadoController : BaseApiController
    {
        private readonly IUserService _userService;
        public EmpleadoController(IUnitOfWork unitOfWork, IMapper mapper, IUserService userService) : base(unitOfWork, mapper)
        {
            _userService = userService;
        }
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> PostEmpleados(EmpleadoCreationDTO[] dtosEmpleados)
        {
            var nuevosEmpleados = _mapper.Map<Empleado[]>(dtosEmpleados);
            _unitOfWork.Empleados.AddRange(nuevosEmpleados);
            await _unitOfWork.SaveAsync();
            return Ok();
        }

        [HttpPost("register/{empleadoId:int}")]
        public async Task<ActionResult> CrearUsuarioAEmpleado(int empleadoId, RegisterDto registerDto)
        {
            int opcionEmpleado = 1;
            var result = await _userService.ResgisterAsync(registerDto, opcionEmpleado, empleadoId);
            return Ok(result);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetAllEmpleados()
        {
            var empleados = await _unitOfWork.Empleados.GetAllAsync();
            if (empleados is null) return NotFound();
            var empleadosMapeados = _mapper.Map<EmpleadoDTO[]>(empleados);
            return Ok(
                new
                {
                    success = true,
                    message = "Ok",
                    result = empleadosMapeados
                }
            );
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult> GetEmpleadoById(int id)
        {
            var empleado = await _unitOfWork.Empleados.GetByIdAsync(id);
            if (empleado is null) return NotFound();
            var empleadoMapaeado = _mapper.Map<EmpleadoDTO>(empleado);
            return Ok(empleadoMapaeado);
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> EditEmpleado(int id, EmpleadoDTO dtoEmpleado)
        {
            bool existeEmpleado = _unitOfWork.Empleados.Exist(e => e.Id == id);
            if (existeEmpleado)
            {
                var empleado = _mapper.Map<Empleado>(dtoEmpleado);
                empleado.Id = id;
                _unitOfWork.Empleados.Update(empleado);
                await _unitOfWork.SaveAsync();
                return Ok(empleado);
            }
            else return NotFound();
        }
        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> DeleteEmpleado(int id)
        {
            var filasAfectadas = await _unitOfWork.Empleados.ExecuteDeleteAsync(e => e.Id == id);
            if (filasAfectadas == 0) return NotFound();

            return NoContent();
        }

        //ventas por empleado
        [HttpGet("ventasporempleado7{empleado}")]
        //[Authorize]
        //[MapToApiVersion("1.1")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<object>> GetventasPorEmpleado(string empleado)
        {
            var ventas = _unitOfWork.Empleados.GetVentasPorEmpleado(empleado);
            if (ventas.ventas == null) return NotFound("No se encontro empleado");
            var info=new{
                
                cantidadDeVentas=ventas.cantidadVentas,
                empleado=_mapper.Map<EmpleadoDTO>(ventas.empleado),
                ventas=_mapper.Map<IEnumerable<VentaDTO>>(ventas.ventas)

            };
            return Ok(info);
        }
    }
}