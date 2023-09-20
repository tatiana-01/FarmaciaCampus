
using Dominio.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistencia.Data.Configuration;
public class EmpleadoConfiguration : IEntityTypeConfiguration<Empleado>
{
    public void Configure(EntityTypeBuilder<Empleado> builder)
    {
        builder.ToTable("Empleados");

        builder.Property(p => p.Id)
        .IsRequired();

        builder.Property(p => p.NumIdentificacion)
        .IsRequired()
        .HasMaxLength(15);

        builder.Property(p => p.Nombre)
        .IsRequired()
        .HasMaxLength(100);

        builder.Property(p => p.FechaNacimiento)
        .IsRequired()
        .HasColumnType("date");

        builder.Property(p => p.Correo)
        .IsRequired()
        .HasMaxLength(100);

        builder.Property(p => p.Telefono)
        .IsRequired()
        .HasMaxLength(15);

        builder.Property(p => p.EPS)
        .IsRequired()
        .HasMaxLength(150);

        builder.Property(p => p.ARL)
        .IsRequired()
        .HasMaxLength(150);

        builder.Property(p => p.Salario)
        .IsRequired()
        .HasColumnType("double");

        builder.Property(p => p.Cargo)
        .IsRequired()
        .HasMaxLength(100);

        builder.Property(p => p.FechaContratacion)
        .IsRequired()
        .HasColumnType("date");

        builder.HasIndex(p => new { p.NumIdentificacion, p.Correo, p.Telefono})
        .IsUnique();

        builder.HasOne(p => p.Usuario)
        .WithOne(p => p.Empleado)
        .HasForeignKey<Empleado>(p => p.UsuarioId);

        builder.HasOne(p => p.Direccion)
        .WithMany(p => p.Empleados)
        .HasForeignKey(p => p.DireccionId);

    }
}
