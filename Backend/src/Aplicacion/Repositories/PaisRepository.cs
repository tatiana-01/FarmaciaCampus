using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dominio.Entities;
using Dominio.Interfaces;
using Persistencia;

namespace Aplicacion.Repositories;
public class PaisRepository : GenericRepository<Pais>, IPais
{
    private readonly FarmaciaContext _context;

    public PaisRepository(FarmaciaContext context) : base(context)
    {
        _context = context;
    }
}