using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistencia;

namespace Aplicacion.Repositories;
public class CompraRepository : GenericRepository<Compra>, ICompra
{
    private readonly FarmaciaContext _context;

    public CompraRepository(FarmaciaContext context) : base(context)
    {
        _context = context;
    }

    public override async Task<(int totalRegistros, IEnumerable<Compra> registros)> GetAllAsync(int pageIndex, int pageSize, string search)
    {
        var totalRegistros=await _context.Set<Compra>().CountAsync();
        var registros = await _context.Set<Compra>()
            .Include(p=>p.MedicamentosComprados)
            .Skip((pageIndex-1)*pageSize)
            .Take(pageSize)
            .ToListAsync();
        return (totalRegistros,registros);
    }

    public override async Task<Compra> GetByIdAsync(int id)
    {
        return await _context.Set<Compra>().Include(p=>p.MedicamentosComprados).FirstOrDefaultAsync(p=>p.Id==id);
    }
}