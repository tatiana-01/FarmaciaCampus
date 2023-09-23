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

    public (IEnumerable<Venta> ventas, int cantidadVentas, Empleado empleado) GetVentasPorEmpleado(string empleado){
        var infoEmpleado= _context.Empleados.FirstOrDefault(p=>p.Nombre.ToLower().Contains(empleado.ToLower()));
        if(infoEmpleado==null)return (null, 0, null);
        var ventasEmpleado=_context.Ventas.Where(p=>p.EmpleadoId==infoEmpleado.Id).Include(p=>p.MedicamentosVendidos);
        infoEmpleado.Direccion=_context.Direcciones.FirstOrDefault(p=>p.Id==infoEmpleado.DireccionId);
        infoEmpleado.Usuario=_context.Usuarios.FirstOrDefault(p=>p.Id==infoEmpleado.UsuarioId);
        return (ventasEmpleado.AsEnumerable(), ventasEmpleado.ToArray().Length, infoEmpleado);
    }

    
    
}