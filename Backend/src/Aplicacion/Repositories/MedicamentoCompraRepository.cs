using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Persistencia;

namespace Aplicacion.Repositories;
public class MedicamentoCompraRepository : GenericRepository<MedicamentoCompra>, IMedicamentoCompra
{
    private readonly FarmaciaContext _context;

    public MedicamentoCompraRepository(FarmaciaContext context) : base(context)
    {
        _context = context;
    }

    /*  public virtual void Update(MedicamentoCompra entity, MedicamentoCompra Anterior)
    {
        
        var diferencia=entity.CantidadComprada-Anterior.CantidadComprada;
        var medicamento= _context.Medicamentos.FirstOrDefault(p=>p.Id==entity.MedicamentoId);
        medicamento.Stock+=diferencia;
        _context.Set<MedicamentoCompra>()
            .Update(entity);
    } */

}