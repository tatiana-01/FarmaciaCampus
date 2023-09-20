using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dominio.Entities;
using Dominio.Interfaces;
using Persistencia;

namespace Aplicacion.Repositories;
public class RolRepository : GenericRepository<Rol>, IRol
{
    private readonly FarmaciaContext _context;
    public RolRepository(FarmaciaContext context) : base(context)
    {
        _context=context;
    }

}