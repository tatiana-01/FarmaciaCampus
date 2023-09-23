using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistencia;

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

}