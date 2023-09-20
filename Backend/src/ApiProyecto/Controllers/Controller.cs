using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ApiProyecto.Controllers;
     /* [ApiVersion("1.0")]
        public class EntidadController : BaseApiController
        {
            private readonly IUnitOfWork _unitOfWork;
            private readonly IMapper _mapper;
    
            public EntidadController(IUnitOfWork unitOfWork, IMapper mapper)
            {
                this._unitOfWork = unitOfWork;
                _mapper = mapper;
            }
    
            [HttpPost]
            [ApiVersion("1.0")]
            [ProducesResponseType(StatusCodes.Status201Created)]
            [ProducesResponseType(StatusCodes.Status400BadRequest)]
            public async Task<ActionResult<EntidadDTO>> Post(EntidadPostDTO EntidadDTO)
            {
                var entidad = _mapper.Map<Entidad>(entidadDTO);
                _unitOfWork.Entidades.Add(entidad);
                await _unitOfWork.SaveAsync();
                if (entidad == null) return BadRequest();
                return _mapper.Map<EntidadDTO>(entidad);
            }
    
            [HttpGet]
            [ProducesResponseType(StatusCodes.Status201Created)]
            [ProducesResponseType(StatusCodes.Status400BadRequest)]
            public async Task<ActionResult<Pager<EntidadGetAllDTO>>> Get([FromQuery] Params param)
            {
                var entidades = await _unitOfWork.Entidades.GetAllAsync(param.PageIndex, param.PageSize, param.Search);
                var lstEntidades = _mapper.Map<List<EntidadGetAllDTO>>(entidades.registros);
                return new Pager<EntidadGetAllDTO>(lstEntidades, entidades.totalRegistros, param.PageIndex, param.PageSize, param.Search);
            }
    
            [HttpGet("{id}")]
            [ProducesResponseType(StatusCodes.Status201Created)]
            [ProducesResponseType(StatusCodes.Status400BadRequest)]
            public async Task<ActionResult<EntidadGetAllDTO>> Get(int id)
            {
                var entidad = await _unitOfWork.Entidades.GetByIdAsync(id);
                return _mapper.Map<EntidadGetAllDTO>(entidad);
            }
    
            [HttpPut("{id}")]
            [ProducesResponseType(StatusCodes.Status201Created)]
            [ProducesResponseType(StatusCodes.Status400BadRequest)]
            public async Task<ActionResult<EntidadDTO>> Put(int id, [FromBody] EntidadPostDTO entidadEdit)
            {
                if (entidadEdit == null) return NotFound();
                var entidad = _mapper.Map<Entidad>(entidadEdit);
                entidad.Id = id;
                _unitOfWork.Entidades.Update(entidad);
                await _unitOfWork.SaveAsync();
                return _mapper.Map<EntidadDTO>(entidad);
            }
    
            [HttpDelete("{id}")]
            [ProducesResponseType(StatusCodes.Status201Created)]
            [ProducesResponseType(StatusCodes.Status400BadRequest)]
            public async Task<ActionResult> Delete(int id)
            {
                var entidad = await _unitOfWork.Entidades.GetByIdAsync(id);
                if (entidad == null) BadRequest();
                _unitOfWork.Entidades.Remove(entidad);
                await _unitOfWork.SaveAsync();
                return NoContent();
            }
        } */