using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
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

    public override void Add(Compra entity)
    {
        foreach (var item in entity.MedicamentosComprados)
        {
            var medicamento=_context.Medicamentos.FirstOrDefault(p=>p.Id==item.MedicamentoId);
            medicamento.Stock+=item.CantidadComprada;
            _context.Set<Medicamento>().Update(medicamento);
        }
        _context.Set<Compra>().Add(entity);
    }

    public virtual void Update(Compra entity, Compra Anterior)
    {
        foreach (var item in entity.MedicamentosComprados)
        {
            var itemAnterior=Anterior.MedicamentosComprados.First(p=>p.Id==item.Id);
            var diferencia=item.CantidadComprada-itemAnterior.CantidadComprada;
            var medicamento= _context.Medicamentos.FirstOrDefault(p=>p.Id==item.MedicamentoId);
            medicamento.Stock+=diferencia;
        }
        Anterior.FechaCompra=entity.FechaCompra;
        Anterior.ProveedorId=entity.ProveedorId;
        Anterior.MedicamentosComprados=entity.MedicamentosComprados;
    } 

}