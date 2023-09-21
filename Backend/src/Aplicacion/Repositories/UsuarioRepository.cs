using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistencia;

namespace Aplicacion.Repositories;
public class UsuarioRepository : GenericRepository<Usuario>, IUsuario
{

    private readonly FarmaciaContext _context; 
    public UsuarioRepository(FarmaciaContext context) : base(context)
    {
        _context=context;
    }

    public async Task<Usuario> GetByUsernameAsync(string username)
    {
        return await _context.Usuarios
                            .Include(u=>u.Roles)
                            .FirstOrDefaultAsync(u=>u.Username.ToLower()==username.ToLower());
    }

    public override async Task<IEnumerable<Usuario>> GetAllAsync()
    {
        return await _context.Set<Usuario>()
        .Include(p => p.Roles)
        .Include(p => p.UsuariosRoles)
        .ToListAsync();
    }

    public override async Task<Usuario> GetByIdAsync(int id)
    {
        return await _context.Set<Usuario>()
        .Include(p => p.Roles)
        .Include(p => p.UsuariosRoles)
        .FirstOrDefaultAsync(p => p.Id == id);
    }

    public override async Task<(int totalRegistros, IEnumerable<Usuario> registros)> GetAllAsync(int pageIndex, int pageSize, string search)
    {
        var query = _context.Usuarios as IQueryable<Usuario>;

        if (!string.IsNullOrEmpty(search)) 
        {
            query = query.Where(p => p.Username.ToLower().Contains(search.ToLower()));
        }

        var totalRegistros=await query.CountAsync();
        var registros = await query
                                .Include(p => p.Roles)
                                .Include(p => p.UsuariosRoles)
                                .Skip((pageIndex-1)*pageSize)
                                .Take(pageSize)
                                .ToListAsync();
                                
        return (totalRegistros,registros);
    }

  
}
