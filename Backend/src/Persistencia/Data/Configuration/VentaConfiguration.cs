
using Dominio.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistencia.Data.Configuration;

public class VentaConfiguration : IEntityTypeConfiguration<Venta>
{
    public void Configure(EntityTypeBuilder<Venta> builder)
    {
        builder.ToTable("Ventas");

        builder.Property(p => p.Id)
        .IsRequired();

        builder.Property(p => p.FechaVenta)
        .IsRequired()
        .HasColumnType("date");

        builder.HasOne(p => p.Paciente)
        .WithMany(p => p.Ventas)
        .HasForeignKey(p => p.PacienteId)
        .IsRequired();

        builder.HasOne(p => p.Empleado)
        .WithMany(p => p.Ventas)
        .HasForeignKey(p => p.EmpleadoId)
        .IsRequired();
    }
}
