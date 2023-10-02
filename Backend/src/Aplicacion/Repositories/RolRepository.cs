using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Persistencia;

namespace Aplicacion.Repositories;
public class RolRepository : GenericRepository<Rol>, IRol
{
    private readonly FarmaciaContext _context;
    public RolRepository(FarmaciaContext context) : base(context)
    {
        _context=context;
    }

    public override async Task<IEnumerable<Rol>> GetAllAsync()
    {
        return await _context.Set<Rol>()
        .Include(p => p.Usuarios)
        .Include(p => p.UsuariosRoles)
        .ToListAsync();
    }

    public override async Task<Rol> GetByIdAsync(int id)
    {
        return await _context.Set<Rol>()
        .Include(p => p.Usuarios)
        .Include(p => p.UsuariosRoles)
        .FirstOrDefaultAsync(p => p.Id == id);
    }

    public override async Task<(int totalRegistros, IEnumerable<Rol> registros)> GetAllAsync(int pageIndex, int pageSize, string search)
    {
        var query = _context.Roles as IQueryable<Rol>;

        if (!string.IsNullOrEmpty(search)) 
        {
            query = query.Where(p => p.Nombre.ToLower().Contains(search.ToLower()));
        }

        var totalRegistros=await query.CountAsync();
        var registros = await query
                                .Include(p => p.Usuarios)
                                .Include(p => p.UsuariosRoles)
                                .Skip((pageIndex-1)*pageSize)
                                .Take(pageSize)
                                .ToListAsync();
                                
        return (totalRegistros,registros);
    }

}