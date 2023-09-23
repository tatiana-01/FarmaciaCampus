using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using MySqlConnector;
using Persistencia;

namespace Aplicacion.Repositories;
public class EmpleadoRepository : GenericRepository<Empleado>, IEmpleado
{
    private readonly FarmaciaContext _context;

    public EmpleadoRepository(FarmaciaContext context) : base(context)
    {
        _context = context;
    }
    public override async Task<IEnumerable<Empleado>> GetAllAsync()
    {
        return await _context.Empleados
            .Include(e =>e.Usuario)
            .Include(e =>e.Direccion)
            .ToListAsync();
    }
    public override async Task<Empleado> GetByIdAsync(int id)
    {
        return await _context.Empleados
        .Include(e =>e.Usuario)
        .Include(e =>e.Direccion)
        .FirstOrDefaultAsync(e =>e.Id == id);   
    }

    public IEnumerable<Empleado> GetVentasEmpleados(){
       var empleados= _context.Empleados.Include(p=>p.Direccion).Include(p=>p.Direccion).Include(p=>p.Ventas).ThenInclude(p=>p.MedicamentosVendidos);
        return empleados.AsEnumerable();
    }

    
    
}