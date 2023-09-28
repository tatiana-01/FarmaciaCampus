using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistencia;

namespace Aplicacion.Repositories;
public class DepartamentoRepository : GenericRepository<Departamento>, IDepartamento
{
    private readonly FarmaciaContext _context;

    public DepartamentoRepository(FarmaciaContext context) : base(context)
    {
        _context = context;
    }

     public override async Task<(int totalRegistros, IEnumerable<Departamento> registros)> GetAllAsync(int pageIndex, int pageSize, string search)
        {
            var query = _context.Departamentos as IQueryable<Departamento>;
            if (!string.IsNullOrEmpty(search))
                query = query.Where(p => p.Nombre.ToLower().Contains(search));
            var totalRegistros = await query.CountAsync();
            var registros = await query
                .Include(p => p.Ciudades)
                .Include(p=>p.Pais)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            return (totalRegistros, registros);
        }
        
        public override async Task<Departamento> GetByIdAsync(int id)
        {
            return await _context.Departamentos
                .Include(p => p.Ciudades)
                .Include(p=>p.Pais)
                .FirstOrDefaultAsync(p => p.Id == id);
        }
}
 