
using Dominio.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistencia.Data.Configuration;
public class ProveedorConfiguation : IEntityTypeConfiguration<Proveedor>
{
    public void Configure(EntityTypeBuilder<Proveedor> builder)
    {
        builder.ToTable("Proveedores");
        
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

        builder.HasIndex(p => new { p.NumIdentificacion, p.Correo, p.Telefono})
        .IsUnique();

        builder.HasOne(p => p.Usuario)
        .WithOne(p => p.Proveedor)
        .HasForeignKey<Proveedor>(p => p.UsuarioId);

        builder.HasOne(p => p.Direccion)
        .WithMany(p => p.Proveedores)
        .HasForeignKey(p => p.DireccionId);
    }
}
