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
    CreateMap<Ciudad, CiudadGetAllDTO>().ForMember(x=>x.IdDepartamento,opt=>opt.MapFrom(p=>p.DptoId)).ReverseMap();
    CreateMap<Ciudad, CiudadDTO>().ForMember(x=>x.IdDepartamento,opt=>opt.MapFrom(p=>p.DptoId)).ReverseMap();
    CreateMap<Ciudad, CiudadPostDTO>().ForMember(x=>x.IdDepartamento,opt=>opt.MapFrom(p=>p.DptoId)).ReverseMap();

    CreateMap<Departamento, DepartamentoGetAllDTO>().ReverseMap();
    CreateMap<Departamento, DepartamentoDTO>().ReverseMap();
    CreateMap<Departamento, DepartamentoPostDTO>().ReverseMap();

    CreateMap<Pais, PaisGetAllDTO>().ReverseMap();
    CreateMap<Pais, PaisDTO>().ReverseMap();
    CreateMap<Pais, PaisPostDTO>().ReverseMap();


    CreateMap<Compra, CompraDTO>().ReverseMap();
    CreateMap<Compra, CompraPostDTO>().ReverseMap();
    CreateMap<Compra, CompraPutDTO>().ReverseMap();

    //CreateMap<MedicamentoCompra, MedicamentoCompraGetAllDTO>().ReverseMap();
    CreateMap<MedicamentoCompra, MedicamentoCompraDTO>().ReverseMap();
    CreateMap<MedicamentoCompra, MedicamentoCompraPostDTO>().ReverseMap();
    CreateMap<MedicamentoCompra, MedicamentoCompraPutDTO>().ReverseMap();


    CreateMap<Venta, VentaDTO>().ReverseMap();
    CreateMap<Venta, VentaPostDTO>().ReverseMap();
    CreateMap<Venta, VentaPutDTO>().ReverseMap();

    //CreateMap<MedicamentoVenta, MedicamentoVentaGetAllDTO>().ReverseMap();
    CreateMap<MedicamentoVenta, MedicamentoVentaDTO>().ReverseMap();
    CreateMap<MedicamentoVenta, MedicamentoVentaPostDTO>().ReverseMap();
  
  }
}
