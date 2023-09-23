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
    public async  Task<object> ProveedoresSinVentas()
    {
        var proveedores =await  _context.Proveedores.ToListAsync();
        var compras = await _context.Compras.ToListAsync();

        var query = 
        from provvedor in proveedores
        join compra in compras
            on provvedor.Id equals compra.ProveedorId into comprasProveedor
            where !comprasProveedor.Any()
            select new {provvedor.Id , provvedor.Nombre};
        return query;
    }
}