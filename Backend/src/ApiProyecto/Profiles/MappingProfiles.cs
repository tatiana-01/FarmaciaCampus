using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiProyecto.Dtos;
using ApiProyecto.Dtos.Ciudad;
using ApiProyecto.Dtos.Departamento;
using ApiProyecto.Dtos.Pais;
using AutoMapper;
using Dominio.Entities;

namespace ApiProyecto.Profiles;
public class MappingProfiles : Profile
{
  public MappingProfiles()
  {
    CreateMap<Ciudad, CiudadGetAllDTO>().ReverseMap();
    CreateMap<Ciudad, CiudadDTO>().ReverseMap();
    CreateMap<Ciudad, CiudadPostDTO>().ReverseMap();

    CreateMap<Departamento, DepartamentoGetAllDTO>().ReverseMap();
    CreateMap<Departamento, DepartamentoDTO>().ReverseMap();
    CreateMap<Departamento, DepartamentoPostDTO>().ReverseMap();

    CreateMap<Pais, PaisGetAllDTO>().ReverseMap();
    CreateMap<Pais, PaisDTO>().ReverseMap();
    CreateMap<Pais, PaisPostDTO>().ReverseMap();

    CreateMap<Empleado,EmpleadoCreationDTO>().ReverseMap();
    CreateMap<Empleado,EmpleadoDTO>().ReverseMap();

    CreateMap<Direccion,DireccionCreationDTO>().ReverseMap();

    CreateMap<Paciente,PersonaCreationDTO>().ReverseMap();
    CreateMap<Paciente,PersonaDTO>().ReverseMap();

    CreateMap<Proveedor,PersonaCreationDTO>().ReverseMap();
    CreateMap<Proveedor,PersonaDTO>().ReverseMap();
  }
}
