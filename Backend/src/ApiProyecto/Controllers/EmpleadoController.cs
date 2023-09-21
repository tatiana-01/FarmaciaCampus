
using ApiProyecto.Dtos;
using AutoMapper;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ApiProyecto.Controllers
{
    public class EmpleadoController : BaseApiController
    {
        public EmpleadoController(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
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
    }
}