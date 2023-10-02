using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Dominio.Entities;
using Microsoft.EntityFrameworkCore;
using Persistencia.seeding;

namespace Persistencia;
public class FarmaciaContext : DbContext
{
    public FarmaciaContext()
    {
    }

    public FarmaciaContext(DbContextOptions<FarmaciaContext> options) : base(options)
    {

    }

    public DbSet<Usuario> Usuarios {get;set;}
    public DbSet<UsuarioRol> UsuariosRoles {get;set;}
    public DbSet<Rol> Roles {get;set;}
    public DbSet<Ciudad> Ciudades { get; set; }
    public DbSet<Compra> Compras { get; set; }
    public DbSet<Departamento> Departamentos { get; set; }
    public DbSet<Direccion> Direcciones { get; set; }
    public DbSet<Empleado> Empleados { get; set; }
    public DbSet<Medicamento> Medicamentos { get; set; }
    public DbSet<MedicamentoCompra> MedicamentosComprados { get; set; }
    public DbSet<MedicamentoVenta> MedicamentosVendidos { get; set; }
    public DbSet<Paciente> Pacientes { get; set; }
    public DbSet<Pais> Paises { get; set; }
    public DbSet<Proveedor> Proveedores { get; set; }
    public DbSet<Venta> Ventas { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        SeedingInicial.Seed(modelBuilder);
    }
}
