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

public class VentaRepository : GenericRepository<Venta>, IVenta
{
    private readonly FarmaciaContext _context;

    public VentaRepository(FarmaciaContext context) : base(context)
    {
        _context = context;
    }

     public override async Task<(int totalRegistros, IEnumerable<Venta> registros)> GetAllAsync(int pageIndex, int pageSize, string search)
    {
        var totalRegistros=await _context.Set<Venta>().CountAsync();
        var registros = await _context.Set<Venta>()
            .Include(p=>p.MedicamentosVendidos)
            .Skip((pageIndex-1)*pageSize)
            .Take(pageSize)
            .ToListAsync();
        return (totalRegistros,registros);
    }

    public override async Task<Venta> GetByIdAsync(int id)
    {
        return await _context.Set<Venta>().Include(p=>p.MedicamentosVendidos).FirstOrDefaultAsync(p=>p.Id==id);
    }

    public override void Remove(Venta entity)
    {
        foreach (var item in entity.MedicamentosVendidos)
        {
            var medicamento=_context.Medicamentos.FirstOrDefault(p=>p.Id==item.MedicamentoId);
            medicamento.Stock+=item.CantidadVendida;
            _context.Set<Medicamento>().Update(medicamento);
        }
        _context.Set<Venta>().Remove(entity);
    }
     public override async Task<IEnumerable<Venta>> GetAllAsync()
     {
        return await _context.Ventas
            .Include(v => v.MedicamentosVendidos).ToListAsync();
     }
     public override IEnumerable<Venta> Find(Expression<Func<Venta, bool>> expression)
     {
        return  _context.Ventas.Where(expression)
            .Include(v =>v.MedicamentosVendidos)
                .ThenInclude(m =>m.Medicamento);
     }


}