
using Dominio.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistencia.Data.Configuration;
public class MedicamentoCompraConfiguration : IEntityTypeConfiguration<MedicamentoCompra>
{
    public void Configure(EntityTypeBuilder<MedicamentoCompra> builder)
    {
        builder.ToTable("MedicamentosComprados");

        builder.Property(p => p.Id)
        .IsRequired();

        builder.Property(p => p.CantidadComprada)
        .IsRequired()
        .HasColumnType("int");

        builder.Property(p => p.PrecioCompra)
        .IsRequired()
        .HasColumnType("double");

        builder.HasOne(p => p.Compra)
        .WithMany(p => p.MedicamentosComprados)
        .HasForeignKey(p => p.CompraId)
        .IsRequired();

        builder.HasOne(p => p.Medicamento)
        .WithMany(p => p.MedicamentosComprados)
        .HasForeignKey(p => p.MedicamentoId)
        .IsRequired();

    }
}
