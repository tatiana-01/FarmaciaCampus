using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistencia;

namespace Aplicacion.Repositories;
public class PaisRepository : GenericRepository<Pais>, IPais
{
    private readonly FarmaciaContext _context;

    public PaisRepository(FarmaciaContext context) : base(context)
    {
        _context = context;
    }

     public override async Task<(int totalRegistros, IEnumerable<Pais> registros)> GetAllAsync(int pageIndex, int pageSize, string search)
        {
            var query = _context.Paises as IQueryable<Pais>;
            if (!string.IsNullOrEmpty(search))
                query = query.Where(p => p.Nombre.ToLower().Contains(search));
            var totalRegistros = await query.CountAsync();
            var registros = await query
                .Include(p => p.Departamentos)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            return (totalRegistros, registros);
        }
        
        public override async Task<Pais> GetByIdAsync(int id)
        {
            return await _context.Paises
                .Include(p => p.Departamentos).ThenInclude(p=>p.Ciudades)
                .FirstOrDefaultAsync(p => p.Id == id);
        }
}