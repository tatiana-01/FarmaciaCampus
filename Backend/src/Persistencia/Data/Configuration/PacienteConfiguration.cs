
using Dominio.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistencia.Data.Configuration;
public class PacienteConfiguration : IEntityTypeConfiguration<Paciente>
{
    public void Configure(EntityTypeBuilder<Paciente> builder)
    {
        builder.ToTable("Pacientes");
        
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
        .WithOne(p => p.Paciente)
        .HasForeignKey<Paciente>(p => p.UsuarioId)
        .IsRequired();

        builder.HasOne(p => p.Direccion)
        .WithMany(p => p.Pacientes)
        .HasForeignKey(p => p.DireccionId)
        .IsRequired();
    }
}
