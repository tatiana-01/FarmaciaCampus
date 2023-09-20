
using Dominio.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistencia.Data.Configuration;
public class MedicamentoConfiguration : IEntityTypeConfiguration<Medicamento>
{
    public void Configure(EntityTypeBuilder<Medicamento> builder)
    {
        builder.ToTable("Medicamentos");

        builder.Property(p => p.Id)
        .IsRequired();

        builder.Property(p => p.Nombre)
        .IsRequired()
        .HasMaxLength(100);

        builder.Property(p => p.Precio)
        .IsRequired()
        .HasColumnType("double");

        builder.Property(p => p.Stock)
        .IsRequired()
        .HasColumnType("int");

        builder.Property(p => p.FechaExpiracion)
        .IsRequired()
        .HasColumnType("date");

        builder.HasIndex(p => p.Nombre)
        .IsUnique();

        builder.HasOne(p => p.Proveedor)
        .WithMany(p => p.Medicamentos)
        .HasForeignKey(p => p.ProveedorId)
        .IsRequired();
    }
}
