
using ApiProyecto.Dtos;
using ApiProyecto.Dtos.Proveedor;
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
        public ProveedorController(IUnitOfWork unitOfWork, IMapper mapper, IUserService userService) : base(unitOfWork, mapper)
        {
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
            return Ok(_mapper.Map<PersonaCreationDTO[]>(nuevosProveedores));
        }

        [HttpPost("register/{proveedorId:int}")]
        public async Task<ActionResult> CrearUsuarioAPaciente(int proveedorId, RegisterDto registerDto)
        {
            //Numero entero equivalente a la categoria de Proveedor nescesario para crear un usuario
            int opcionProveedor = 3;
            var result = await _userService.ResgisterAsync(registerDto, opcionProveedor, proveedorId);
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

        [HttpGet("{id:int}")]
        public async Task<ActionResult> GetProveedorById(int id)
        {
            var proveedor = await _unitOfWork.Proveedores.GetByIdAsync(id);
            if (proveedor is null) return NotFound();
            var proveedorMapeado = _mapper.Map<PersonaDTO>(proveedor);
            return Ok(proveedorMapeado);
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> EditProveedor(int id, PersonaDTO dtoPersona)
        {
            bool existeProveedor = _unitOfWork.Proveedores.Exist(e => e.Id == id);
            if (existeProveedor)
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
        [HttpGet("SinVentas")]
        public async Task<ActionResult> GetProveedoresSinVentas()
        {
            var result = await _unitOfWork.Proveedores.ProveedoresSinVentas();
            return Ok(result);
        }
        [HttpGet("VendieronMedicamentosEn2023")]

        public ActionResult ProveedoresQueVendieronEn2023()
        {
            var result = _unitOfWork.Proveedores.ProveedoresQueVendieronEn2023();
            if(result is null ) return NotFound();

            var query = result as IEnumerable<Proveedor>;
            return Ok(new {
                Total = query.Count(),
                Result = query.Select(q =>new{ 
                    q.Id,
                    q.Nombre
                })
            });
         
        }

        //CONSULTA PARA BUSCAR EL NUMERO DE MEDICAMENTOS POR CADA PROVEEDOR 
        [HttpGet("NumeroMedicamentosProveedor")]
        //[Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<ProveedorXmedicamentoDto>>> GetNumeroMedicProvee()
        {
            var lstMedicProvee = await _unitOfWork.Proveedores.GetAllProveedorMedicAsync();

            if ((lstMedicProvee.Count() == 0) || (lstMedicProvee == null))
            {
                throw new UnauthorizedAccessException("No se encontro ningun Proveedor");
            }

            List<ProveedorXmedicamentoDto> numeroMedicProvee = new();
        
            foreach (var lstProveMedic in lstMedicProvee)
            {
                ProveedorXmedicamentoDto proveedorXmedicamentoDto = new()
                {
                    Id = lstProveMedic.Id,
                    Nombre = lstProveMedic.Nombre,
                    NumeroDeMedicamentos = lstProveMedic.Medicamentos.Count()
                };
                numeroMedicProvee.Add(proveedorXmedicamentoDto);
            }
            
            return _mapper.Map<List<ProveedorXmedicamentoDto>>(numeroMedicProvee);
        }

        //CONSULTA PARA DETERMINA EL MUNERO DE PROVEEDORES DE MEDICAMENTOS CON UN STOCK MENOR VARIABLE
        [HttpGet("ProveedoresDeMedicaStockMenorA/{stock}")]
        //[Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<ProveedorMedicEnStockMenorDto>>> GetProvvedorMenorStock(int stock)
        {
            if (int.IsNegative(stock)) 
            {
                throw new UnauthorizedAccessException("El stock ingresado es negativo o no existe.");
            }

            var lstProveeSinStock = await _unitOfWork.Proveedores.GetAllProveedoreMedicMenosStockAsync(stock);

            if ((lstProveeSinStock.Count() == 0) || (lstProveeSinStock == null))
            {
                throw new UnauthorizedAccessException("No se encontro ningun Proveedor con ese Stock");
            }

            return _mapper.Map<List<ProveedorMedicEnStockMenorDto>>(lstProveeSinStock);
        }


        //proveedor mas medicamentos en 2023
        [HttpGet("masMedicamentos2023")]
        //[Authorize]
        //[MapToApiVersion("1.1")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<object>> GetProveedorMasMedicamentos2023()
        {
            var proveedores = _unitOfWork.Proveedores.GetProveedorMenosCompras();
            //if (proveedores.IsNullOrEmpty()) return NotFound("No se encontraron proveedores");
            return Ok(proveedores);
        }

    }
}