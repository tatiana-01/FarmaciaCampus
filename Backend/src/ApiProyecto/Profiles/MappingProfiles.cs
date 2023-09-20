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

    CreateMap<Compra, CompraGetAllDTO>().ReverseMap();
    CreateMap<Compra, CompraDTO>().ReverseMap();
    CreateMap<Compra, CompraPostDTO>().ReverseMap();
    CreateMap<Compra, CompraPutDTO>().ReverseMap();

    //CreateMap<MedicamentoCompra, MedicamentoCompraGetAllDTO>().ReverseMap();
    CreateMap<MedicamentoCompra, MedicamentoCompraDTO>().ReverseMap();
    CreateMap<MedicamentoCompra, MedicamentoCompraPostDTO>().ReverseMap();
  }
}
