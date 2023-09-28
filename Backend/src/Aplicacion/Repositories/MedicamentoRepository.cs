using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.VisualBasic;
using Persistencia;
using Persistencia.Data.Configuration;

namespace Aplicacion.Repositories;
public class MedicamentoRepository : GenericRepository<Medicamento>, IMedicamento
{
    private readonly FarmaciaContext _context;

    public MedicamentoRepository(FarmaciaContext context) : base(context)
    {
        _context = context;
    }

    public override async Task<IEnumerable<Medicamento>> GetAllAsync()
    {
        return await _context.Set<Medicamento>()
        .Include(p => p.MedicamentosComprados)
        .Include(p => p.MedicamentosVendidos)
        .ToListAsync();
    }
    public override IEnumerable<Medicamento> Find(Expression<Func<Medicamento, bool>> expression)
    {
        return  _context.Set<Medicamento>().Where(expression)
            .Include(x =>x.MedicamentosVendidos)
            .Include(x => x.MedicamentosComprados)
            .Include( x =>x.Proveedor)
            .ToList();
    }

    public override async Task<Medicamento> GetByIdAsync(int id)
    {
        return await _context.Set<Medicamento>()
        .Include(p => p.MedicamentosComprados)
        .Include(p => p.MedicamentosVendidos)
        .FirstOrDefaultAsync(p => p.Id == id);
    }

    public override async Task<(int totalRegistros, IEnumerable<Medicamento> registros)> GetAllAsync(int pageIndex, int pageSize, string search)
    {
        var query = _context.Medicamentos as IQueryable<Medicamento>;

        if (!string.IsNullOrEmpty(search)) 
        {
            query = query.Where(p => p.Nombre.ToLower().Contains(search.ToLower()));
        }

        var totalRegistros=await query.CountAsync();
        var registros = await query
                                .Include(p => p.MedicamentosComprados)
                                .Include(p => p.MedicamentosVendidos)
                                .Skip((pageIndex-1)*pageSize)
                                .Take(pageSize)
                                .ToListAsync();
                                
        return (totalRegistros,registros);
    }
    
    public async Task<IEnumerable<Medicamento>> GetMedicamentosByProveedor(string proveedor){
        var infoProveedor= await  _context.Proveedores.FirstOrDefaultAsync(p=>p.Nombre.ToLower().Contains(proveedor.ToLower()));
        if(infoProveedor==null) return null;
        var medicamentos=_context.Medicamentos.Where(p=>p.ProveedorId==infoProveedor.Id);
        return medicamentos;
    }

    public IEnumerable<object> GetMenosVendido(){
        var ventas2023= _context.Ventas.Where(p=>p.FechaVenta.Year==2023);
        List<object> medicamentos= new List<object>();  
        if(ventas2023==null) return null;
        var medsVentas= ventas2023.SelectMany(p=>p.MedicamentosVendidos);
        var medsVentasGroup=medsVentas.GroupBy(x=>x.MedicamentoId);
        var verificar=(_context.Medicamentos.Select(p=>p.Id).ToArray().Except(medsVentas.Select(p=>p.MedicamentoId).ToArray())).ToArray();
        if(verificar.Length!=0){
            foreach (var item in verificar)
        {
            var medicamento=_context.Medicamentos.FirstOrDefault(x=>x.Id==item);
            medicamentos.Add(new{medicamentoId=medicamento.Id,Nombre=medicamento.Nombre,proveedor=_context.Proveedores.FirstOrDefault(p=>p.Id==medicamento.ProveedorId).Nombre,TotalVentas=0});
        }
        return medicamentos.AsEnumerable();
        }
        int cantidadVentas=0;
        List<(int CantidadVendida, int medicamento)> info= new List<(int,int)>();
              
        foreach (var ventas in medsVentasGroup)
        {
            cantidadVentas=0;
            foreach (var venta in ventas)
            {
                cantidadVentas+=venta.CantidadVendida;
            }
            info.Add((cantidadVentas,ventas.Key));
        }
        var cantidadMinima=info.Select(x=>x.CantidadVendida).Min();
        var menor=info.Where(x=>x.CantidadVendida==cantidadMinima);
        foreach (var item in menor)
        {
            var medicamento=_context.Medicamentos.FirstOrDefault(x=>x.Id==item.medicamento);
            medicamentos.Add(new{medicamentoId=medicamento.Id,Nombre=medicamento.Nombre,proveedor=_context.Proveedores.FirstOrDefault(p=>p.Id==medicamento.ProveedorId).Nombre,TotalVentas=cantidadMinima});
        }
    
        return medicamentos.AsEnumerable();
    }
    
    public IEnumerable<Medicamento> GetNuncaVendido(){
        List<Medicamento> medicamentos= new List<Medicamento>();
        var nuncaVendido=(_context.Medicamentos.Select(p=>p.Id).ToArray().Except(_context.MedicamentosVendidos.Select(p=>p.MedicamentoId).ToArray())).ToArray();
            foreach (var item in nuncaVendido)
        {
            var medicamento=_context.Medicamentos.FirstOrDefault(x=>x.Id==item);
            medicamentos.Add(medicamento);
        }
        return medicamentos.AsEnumerable();
    }
  
    public async Task<IEnumerable<Proveedor>> GetAllProveedorContacto()
    {
        var lstProveedorConct = _context.Set<Proveedor>()
        .Include(p => p.Medicamentos)
        .Where(p => !((p.Medicamentos == null) || (p.Medicamentos.Count() == 0)))
        .ToListAsync();

        return await lstProveedorConct; 
    }

    public async Task<Medicamento> GetByNombreMedicamento(string medicamento)
    {
        var lstMedicamentoVenta = _context.Set<Medicamento>()
        .Include(p => p.MedicamentosVendidos)
        .Where(p => p.Nombre.ToLower() == medicamento.ToLower())
        .FirstOrDefaultAsync();

        return await lstMedicamentoVenta;
    }

    public async Task<IEnumerable<Medicamento>> GetAllMedicamentosMayorPrecioMenorStock(double mayorPrecio, int menorStock)
    {
        var lstMedicamentos = _context.Medicamentos
        .Where(p => p.Precio > mayorPrecio)
        .Where(p => p.Stock < menorStock)
        .ToListAsync();

        return await lstMedicamentos;
    }
        
    public (List<(int CantidadVendida, int medicamento)> lstInfo,int total) GetMedicamentosPrimerTrimestre2023()
    {
        int cantidadVentaMed=0;
        int cantidadTotal=0;
        List<(int CantidadVendida, int medicamento)> info= new ();
        var lstMedicamentoVentaPorMedicamentoId = _context.MedicamentosVendidos
        .Include(p=>p.Venta)
        .Where(p=>p.Venta.FechaVenta.CompareTo(new DateTime(2023,04,01))<0)
        .GroupBy(p=>p.MedicamentoId);

        foreach (var medicamentoVenta in lstMedicamentoVentaPorMedicamentoId)
        {
            cantidadVentaMed=0;
            foreach (var venta in medicamentoVenta)
            {
                cantidadVentaMed+=venta.CantidadVendida;
            }
            cantidadTotal+=cantidadVentaMed;
            info.Add((cantidadVentaMed,medicamentoVenta.Key));
        }

        return (info,cantidadTotal);
    }
}