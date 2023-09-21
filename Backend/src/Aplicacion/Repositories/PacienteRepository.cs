using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistencia;

namespace Aplicacion.Repositories;
public class PacienteRepository : GenericRepository<Paciente>, IPaciente
{
    private readonly FarmaciaContext _context;

    public PacienteRepository(FarmaciaContext context) : base(context)
    {
        _context = context;
    }
     public override async Task<IEnumerable<Paciente>> GetAllAsync()
     {
        return await _context.Pacientes
            .Include(p =>p.Usuario)
            .Include(p =>p.Direccion)
            .ToListAsync();
     }
}