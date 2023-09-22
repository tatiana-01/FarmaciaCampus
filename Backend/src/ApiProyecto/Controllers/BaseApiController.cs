using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Dominio.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Persistencia;

namespace ApiProyecto.Controllers;
[ApiController]
[Route("api/Farmacia/[controller]")]
public class BaseApiController : ControllerBase
{
    protected IUnitOfWork _unitOfWork;
    protected IMapper _mapper;
    public BaseApiController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }
}
