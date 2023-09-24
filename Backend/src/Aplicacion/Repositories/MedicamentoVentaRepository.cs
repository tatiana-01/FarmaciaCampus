using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistencia;

namespace Aplicacion.Repositories;
public class MedicamentoVentaRepository : GenericRepository<MedicamentoVenta>, IMedicamentoVenta
{
    private readonly FarmaciaContext _context;

    public MedicamentoVentaRepository(FarmaciaContext context) : base(context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Venta>> GetAllTotalMedicamentosVendidosAsync(DateTime fecha)
    {
        var lstTotalMedicVendidos = _context.Set<Venta>()
        .Include(p => p.MedicamentosVendidos)
        .Where(p => (p.FechaVenta.Year == fecha.Date.Year && p.FechaVenta.Month == fecha.Date.Month))
        .ToListAsync();

        return await lstTotalMedicVendidos;
    }

}