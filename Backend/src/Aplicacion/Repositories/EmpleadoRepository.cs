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
            .Include(e => e.Usuario)
            .Include(e => e.Direccion)
            .ToListAsync();
    }
    public override async Task<Empleado> GetByIdAsync(int id)
    {
        return await _context.Empleados
        .Include(e => e.Usuario)
        .Include(e => e.Direccion)
        .FirstOrDefaultAsync(e => e.Id == id);
    }

    public object EmpleadosNoVendieronEn2023()
    {
        var empleadosQueVendieronEn2023 =
            from empleado in _context.Empleados
            join venta in _context.Ventas on empleado.Id equals venta.EmpleadoId
            where venta.FechaVenta.Year == 2023
            select empleado.Id;

        var empleadosQueNoVendieronEn2023 =
            from empleado in _context.Empleados
            where !empleadosQueVendieronEn2023.Contains(empleado.Id)
            select new
            {
                empleado.Id,
                empleado.Nombre,
                empleado.FechaContratacion,
                empleado.Cargo, 
                empleado.Salario,
            };

        return empleadosQueNoVendieronEn2023;
    }

    public IEnumerable<Empleado> GetVentasEmpleados(){
       var empleados= _context.Empleados.Include(p=>p.Direccion).Include(p=>p.Direccion).Include(p=>p.Ventas).ThenInclude(p=>p.MedicamentosVendidos);
        return empleados.AsEnumerable();
    }

    public IEnumerable<Empleado> GetEmpleadosMenosDe5Ventas(){
        var ventasEmpleados = GetVentasEmpleados().Where(p => p.Ventas.AsEnumerable().Where(p => p.FechaVenta.Year == 2023).ToArray().Length < 5);
        return ventasEmpleados.AsEnumerable();
    }
    
}