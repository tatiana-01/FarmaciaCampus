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

    public object MedicamentosVenndidosPorMesEn2023()
    {
        int Anio2023 = new DateTime(2023, 1, 1).Year;
        var query =
            from venta in _context.Ventas.ToList()
            join medicamentoVenta in _context.MedicamentosVendidos.ToList() on venta.Id equals medicamentoVenta.VentaId
            join medicamento in _context.Medicamentos.ToList() on medicamentoVenta.MedicamentoId equals medicamento.Id
            where venta.FechaVenta.Year == Anio2023
            group medicamento by new { Mes = venta.FechaVenta.Month } into newGrup
            select new
            {
                Mes = newGrup.Key.Mes,
                Medicamentos = newGrup.Select(m => m.Nombre).Distinct().ToList()

            };

        return query;
    }

    public object MedicamentosNoVendidos2023()
    {
        var listaMedicamentos = _context.Medicamentos;
        var listaVentas = _context.Ventas;
        var listaVentaMedicamentos = _context.MedicamentosVendidos;

        var medicamentosVendidosEn2023 =
           from venta in listaVentas
           join medicamentoVenta in listaVentaMedicamentos on venta.Id equals medicamentoVenta.VentaId
           where venta.FechaVenta.Year == 2023
           select medicamentoVenta.MedicamentoId;

        var medicamentosNoVendidosEn2023 = 
            from medicamento in listaMedicamentos
            where !medicamentosVendidosEn2023.Contains(medicamento.Id)
            select medicamento;

        return medicamentosNoVendidosEn2023;
    }

    public async Task<IEnumerable<Venta>> GetAllTotalMedicamentosVendidosAsync(DateTime fecha)
    {
        var lstTotalMedicVendidos = _context.Set<Venta>()
        .Include(p => p.MedicamentosVendidos)
        .Where(p => (p.FechaVenta.Year == fecha.Date.Year && p.FechaVenta.Month == fecha.Date.Month))
        .ToListAsync();

        return await lstTotalMedicVendidos;
    }

    public IEnumerable<object> GetCalcularPromedioPorVentas()
    {
        List<object> promedio = new();
        var totalVenta = _context.Set<Venta>().Count();
        var lstMedicaVendidos = _context.Set<MedicamentoVenta>();

        var totalCantidad = 0;
        foreach (var medicVendidos in lstMedicaVendidos)
        {
            totalCantidad += medicVendidos.CantidadVendida;
        }
        promedio.Add(new {

            PromedioMedicPorVentaEs = totalCantidad/totalVenta
        });

        return promedio;
    }
}