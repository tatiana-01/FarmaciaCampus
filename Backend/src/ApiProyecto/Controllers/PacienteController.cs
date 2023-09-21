
using ApiProyecto.Dtos;
using AutoMapper;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ApiProyecto.Controllers
{
    public class PacienteController : BaseApiController
    {
        public PacienteController(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
        }

        [HttpPost]
        public async Task<ActionResult> PostPacientes(PersonaCreationDTO[] dtosPersonas)
        {
            var nuevosPacientes = _mapper.Map<Paciente[]>(dtosPersonas);
            _unitOfWork.Pacientes.AddRange(nuevosPacientes);
            await _unitOfWork.SaveAsync();
            return Ok();
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetAllEmpleados()
        {
            var pacientes = await _unitOfWork.Pacientes.GetAllAsync();
            if (pacientes is null) return NotFound();
            var pacientesMapeados = _mapper.Map<PersonaDTO[]>(pacientes);
            return Ok(
                new
                {
                    success = true,
                    message = "Ok",
                    result = pacientesMapeados
                }
            );
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> EditPaciente(int id, PersonaCreationDTO dtoPersona)
        {
            bool existePaciente = _unitOfWork.Pacientes.Exist(e => e.Id == id);
            if (existePaciente)
            {
                var paciente = _mapper.Map<Paciente>(dtoPersona);
                paciente.Id = id;
                _unitOfWork.Direcciones.ConfigureUnchangedState(paciente.Direccion);
                _unitOfWork.Pacientes.Update(paciente);
                await _unitOfWork.SaveAsync();
                return Ok(paciente);
            }
            else return NotFound();
        }
        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> DeletePaciente(int id)
        {
            var filasAfectadas = await _unitOfWork.Pacientes.ExecuteDeleteAsync(e => e.Id == id);
            if (filasAfectadas == 0) return NotFound();

            return NoContent();
        }
    }
}