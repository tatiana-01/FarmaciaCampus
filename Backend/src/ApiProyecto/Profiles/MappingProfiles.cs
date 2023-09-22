using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiProyecto.Dtos;
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
    CreateMap<Ciudad, CiudadGetAllDTO>().ForMember(x=>x.IdDepartamento,opt=>opt.MapFrom(p=>p.DptoId)).ReverseMap();
    CreateMap<Ciudad, CiudadDTO>().ForMember(x=>x.IdDepartamento,opt=>opt.MapFrom(p=>p.DptoId)).ReverseMap();
    CreateMap<Ciudad, CiudadPostDTO>().ForMember(x=>x.IdDepartamento,opt=>opt.MapFrom(p=>p.DptoId)).ReverseMap();

    CreateMap<Departamento, DepartamentoGetAllDTO>().ReverseMap();
    CreateMap<Departamento, DepartamentoDTO>().ReverseMap();
    CreateMap<Departamento, DepartamentoPostDTO>().ReverseMap();

    CreateMap<Pais, PaisGetAllDTO>().ReverseMap();
    CreateMap<Pais, PaisDTO>().ReverseMap();
    CreateMap<Pais, PaisPostDTO>().ReverseMap();

    CreateMap<Medicamento, MedicamentoDto>().ReverseMap();
    CreateMap<Medicamento, MedicamentoXcompraXventaDto>().ReverseMap();
    CreateMap<Medicamento, NombreMedicamentoDto>().ReverseMap();

    CreateMap<Rol, RolDto>().ReverseMap();
    CreateMap<Rol, RolXusuarioDto>().ReverseMap();

    CreateMap<Usuario, UsuarioDto>().ReverseMap();
    CreateMap<Usuario, UsuarioXrolDto>().ReverseMap();

    CreateMap<UsuarioRol, UsuarioRolDto>().ReverseMap();

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

    CreateMap<Proveedor, ListaProveedorDto>().ReverseMap();

  
  }
}
