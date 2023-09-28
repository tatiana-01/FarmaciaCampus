
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

        [HttpGet("NoVendieronEn2023")]
        public ActionResult EmpleadosNoVendieronEn2023()
        {
            var result = _unitOfWork.Empleados.EmpleadosNoVendieronEn2023();
            if(result is null) return NotFound();

            return Ok(result);
        }

        //ventas de cada empleado 2023
        [HttpGet("ventasporempleado")]
        //[Authorize]
        //[MapToApiVersion("1.1")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<object>> GetventasPorEmpleado()
        {
            List<object> EmpleadosVentas= new List<object>();
            var ventas = _unitOfWork.Empleados.GetVentasEmpleados();
            if (ventas == null) return NotFound();
            foreach (var item in ventas)
            {
                item.Ventas=item.Ventas.Where(p => p.FechaVenta.Year == 2023).ToList();
                EmpleadosVentas.Add(new{
                    cantidadDeVentas = item.Ventas.Count,
                    InfoEmpleado=_mapper.Map<EmpleadoGetAllDTO>(item)
                });
            }
            return Ok(EmpleadosVentas.AsEnumerable());
        }


        //Empleados con menos de 5 ventas 2023
        [HttpGet("empleadosmenosde5ventas")]
        //[Authorize]
        //[MapToApiVersion("1.1")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<object>> GetEmpleadosVentas5()
        {
            List<object> EmpleadosVentas= new List<object>();
            var ventas = _unitOfWork.Empleados.GetEmpleadosMenosDe5Ventas();
            if (ventas == null) return NotFound();
            foreach (var item in ventas)
            {
                item.Ventas=item.Ventas.Where(p => p.FechaVenta.Year == 2023).ToList();
                EmpleadosVentas.Add(new{
                    cantidadDeVentas = item.Ventas.Count,
                    InfoEmpleado=_mapper.Map<EmpleadoGetAllDTO>(item)
                });
            }
            return Ok(EmpleadosVentas.AsEnumerable());
        }

        
    }
}