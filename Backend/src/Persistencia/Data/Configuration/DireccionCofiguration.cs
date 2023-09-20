using Dominio.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistencia.Data.Configuration;
public class DireccionCofiguration : IEntityTypeConfiguration<Direccion>
{
    public void Configure(EntityTypeBuilder<Direccion> builder)
    {
        builder.ToTable("Direcciones");

        builder.Property(p => p.Id)
        .IsRequired();

        builder.Property(p => p.TipoVia)
        .HasMaxLength(50);

        builder.Property(p => p.NumeroVia)
        .HasColumnType("int(5)");

        builder.Property(p => p.LetraVia)
        .HasMaxLength(5);

        builder.Property(p => p.SufijoCardinal)
        .HasMaxLength(50);

        builder.Property(p => p.Barrio)
        .HasMaxLength(100);

        builder.Property(p => p.CodigoPostal)
        .HasMaxLength(10);

        builder.HasOne(p => p.Ciudad)
        .WithMany(p => p.Direcciones)
        .HasForeignKey(p => p.CiudadId)
        .IsRequired();

    }
}
