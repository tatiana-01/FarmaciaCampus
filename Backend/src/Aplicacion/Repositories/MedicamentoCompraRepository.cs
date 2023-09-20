using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dominio.Entities;
using Dominio.Interfaces;
using Persistencia;

namespace Aplicacion.Repositories;
public class MedicamentoCompraRepository : GenericRepository<MedicamentoCompra>, IMedicamentoCompra
{
    private readonly FarmaciaContext _context;

    public MedicamentoCompraRepository(FarmaciaContext context) : base(context)
    {
        _context = context;
    }
}