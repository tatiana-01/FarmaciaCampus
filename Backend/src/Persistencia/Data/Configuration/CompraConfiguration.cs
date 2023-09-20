
using Dominio.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistencia.Data.Configuration;
public class CompraConfiguration : IEntityTypeConfiguration<Compra>
{
    public void Configure(EntityTypeBuilder<Compra> builder)
    {
        builder.ToTable("Compras");

        builder.Property(p => p.Id)
        .IsRequired();

        builder.Property(p => p.FechaCompra)
        .IsRequired()
        .HasColumnType("date");

        builder.HasOne(p => p.Proveedor)
        .WithMany(p => p.Compras)
        .HasForeignKey(p => p.ProveedorId)
        .IsRequired();
    }
}
