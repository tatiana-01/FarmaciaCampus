using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dominio.Entities;
using Dominio.Interfaces;
using Persistencia;

namespace Aplicacion.Repositories;
public class DireccionRepository : GenericRepository<Direccion>, IDireccion
{
    private readonly FarmaciaContext _context;

    public DireccionRepository(FarmaciaContext context) : base(context)
    {
        _context = context;
    }
}
