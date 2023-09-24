
using ApiProyecto.Dtos;
using ApiProyecto.Dtos.Usuario;
using ApiProyecto.Services;
using AutoMapper;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace ApiProyecto.Controllers
{
    public class PacienteController : BaseApiController
    {
        private readonly IUserService _userService;
        public PacienteController(IUnitOfWork unitOfWork, IMapper mapper, IUserService userService) : base(unitOfWork, mapper)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<ActionResult> PostPacientes(PersonaCreationDTO[] dtosPersonas)
        {
            var nuevosPacientes = _mapper.Map<Paciente[]>(dtosPersonas);
            _unitOfWork.Pacientes.AddRange(nuevosPacientes);
            await _unitOfWork.SaveAsync();
            return Ok();
        }

        [HttpPost("register/{pacienteId:int}")]
        public async Task<ActionResult> CrearUsuarioAPaciente(int pacienteId, RegisterDto registerDto)
        {
            //Numero entero equivalente a la categoria de Paciente nescesario para crear un usuario
            int opcionPaciente = 2;
            var result = await _userService.ResgisterAsync(registerDto, opcionPaciente, pacienteId);
            return Ok(result);
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

        [HttpGet("{id:int}")]
        public async Task<ActionResult> GetPacienteById(int id)
        {
            var paciente = await _unitOfWork.Pacientes.GetByIdAsync(id);
            if (paciente is null) return NotFound();
            var pacienteMapeado = _mapper.Map<PersonaDTO>(paciente);
            return Ok(paciente);
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> EditPaciente(int id, PersonaDTO dtoPersona)
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

        //Obtener pacientes que hayan comprado paracetamol.
        [HttpGet("pacienteParacetamol")]
        //[Authorize]
        //[MapToApiVersion("1.1")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<object>>> GetPacientesParacetamol()
        {
            var pacientes = (await _unitOfWork.Pacientes.GetPacientesParacetamol()).AsEnumerable();
            if (pacientes.IsNullOrEmpty()) return NotFound("No se encontro paciente");

            return Ok(pacientes);
        }

        //Obtener gastos de pacientes en 2023.
        [HttpGet("gastosPacientes2023")]
        //[Authorize]
        //[MapToApiVersion("1.1")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<List<object>> GetGastosPacientes2023()
        {
            var pacientes =  _unitOfWork.Pacientes.GetGastosPacientes();

            if (pacientes.IsNullOrEmpty()) return NotFound("No se encontro paciente");

            return Ok(pacientes);
        }
    }
}