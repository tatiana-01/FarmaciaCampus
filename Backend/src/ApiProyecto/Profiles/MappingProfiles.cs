using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiProyecto.Dtos.Ciudad;
using ApiProyecto.Dtos.Departamento;
using ApiProyecto.Dtos.Medicamento;
using ApiProyecto.Dtos.Pais;
using ApiProyecto.Dtos.Rol;
using ApiProyecto.Dtos.Usuario;
using ApiProyecto.Dtos.UsuarioRol;
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

    CreateMap<Medicamento, MedicamentoDto>().ReverseMap();
    CreateMap<Medicamento, MedicamentoXcompraXventaDto>().ReverseMap();

    CreateMap<Rol, RolDto>().ReverseMap();
    CreateMap<Rol, RolXusuarioDto>().ReverseMap();

    CreateMap<Usuario, UsuarioDto>().ReverseMap();
    CreateMap<Usuario, UsuarioXrolDto>().ReverseMap();

    CreateMap<UsuarioRol, UsuarioRolDto>().ReverseMap();
  }
}
