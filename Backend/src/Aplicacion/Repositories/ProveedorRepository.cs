using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistencia;

namespace Aplicacion.Repositories;
public class ProveedorRepository : GenericRepository<Proveedor>, IProveedor
{
    private readonly FarmaciaContext _context;

    public ProveedorRepository(FarmaciaContext context) : base(context)
    {
        _context = context;
    }
    public override async Task<IEnumerable<Proveedor>> GetAllAsync()
    {
        return await _context.Proveedores
            .Include(p =>p.Usuario)
            .Include(p =>p.Direccion)
            .ToListAsync();
    }

    public override async Task<Proveedor> GetByIdAsync(int id)
    {
        return await _context.Proveedores
        .Include(e =>e.Usuario)
        .Include(e =>e.Direccion)
        .FirstOrDefaultAsync(e =>e.Id == id);   
    }


    public IEnumerable<object> GetProveedorMenosCompras(){
        var compras2023= _context.Compras.Include(p=>p.MedicamentosComprados).Where(p=>p.FechaCompra.Year==2023);
        List<object> proveedores= new List<object>();  
        //if(compras2023==null) return 0;
        var ComprasGroup=compras2023.GroupBy(x=>x.ProveedorId);
        int cantidadCompras=0;
        List<(int CantidadComprada, int Proveedor)> info = new List<(int, int)>();
              
        foreach (var compras in ComprasGroup)
        {
            cantidadCompras=0;
            foreach (var compra in compras)
            {
                foreach (var item in compra.MedicamentosComprados)
                {
                    cantidadCompras+=item.CantidadComprada;
                }
            }
           info.Add((cantidadCompras,compras.Key));
        }
       int cantidadMaxima=info.Max(x=>x.CantidadComprada);
 
        var maximo=info.Where(x => x.CantidadComprada==cantidadMaxima);
        foreach (var item in maximo)
        {
            var proveedor=_context.Proveedores.Include(p=>p.Direccion).FirstOrDefault(x=>x.Id==item.Proveedor);
            proveedores.Add(new{proveedorId=proveedor.Id,Nombre=proveedor.Nombre,TotalMedicamentosSuministrados=cantidadMaxima});
        }
    
        return proveedores.AsEnumerable();
    }

    public async Task<IEnumerable<Proveedor>> GetAllProveedorMedicAsync()
    {
        var lstNumeroMedicProveedor = _context.Set<Proveedor>()
        .Include(p => p.Medicamentos)
        .ToListAsync();

        return await lstNumeroMedicProveedor;
    }

    public async Task<IEnumerable<Proveedor>> GetAllProveedoreMedicMenosStockAsync(int stock)
    {
        var lstProveedoresMenosStock = _context.Set<Proveedor>()
        .Include(p => p.Medicamentos)
        .Where(p => p.Medicamentos.Any(p => p.Stock <= stock))
        .ToListAsync();
        
        return await lstProveedoresMenosStock;
    }
}