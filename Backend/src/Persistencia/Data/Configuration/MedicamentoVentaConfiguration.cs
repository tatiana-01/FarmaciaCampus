using Dominio.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistencia.Data.Configuration;
public class MedicamentoVentaConfiguration : IEntityTypeConfiguration<MedicamentoVenta>
{
    public void Configure(EntityTypeBuilder<MedicamentoVenta> builder)
    {
        builder.ToTable("MedicamentosVendidos");

        builder.Property(p => p.Id)
        .IsRequired();

        builder.Property(p => p.CantidadVendida)
        .IsRequired()
        .HasColumnType("int");

        builder.Property(p => p.Precio)
        .IsRequired()
        .HasColumnType("double");

        builder.HasOne(p => p.Venta)
        .WithMany(p => p.MedicamentosVendidos)
        .HasForeignKey(p => p.VentaId)
        .IsRequired();

        builder.HasOne(p => p.Medicamento)
        .WithMany(p => p.MedicamentosVendidos)
        .HasForeignKey(p => p.MedicamentoId)
        .IsRequired();

    }
}
