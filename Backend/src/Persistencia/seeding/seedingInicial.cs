using Microsoft.EntityFrameworkCore;

namespace Persistencia.seeding;
public class SeedingInicial
{
    public static void Seed(ModelBuilder modelBuilder)
    {
        /* var pais=new Pais(){
            Id=1,
            Nombre="Colombia"
        };
        var departamento1=new Departamento(){
            Id=1,
            Nombre="Santander",
            PaisId=1
        };
         var departamento2=new Departamento(){
            Id=2,
            Nombre="Norte de Santander",
            PaisId=1
        };
         var ciudad1=new Ciudad(){
            Id=1,
            Nombre="Bucaramanga",
            DptoId=1
        };
        var ciudad2=new Ciudad(){
            Id=2,
            Nombre="Floridablanca",
            DptoId=1
        };
        var ciudad3=new Ciudad(){
            Id=3,
            Nombre="Cucuta",
            DptoId=2
        };
        var direccion1= new Direccion(){
            
        }
        var fecha=new DateTime(2001,09,13);
        var paciente1 = new Empleado()
        {
                Id = 1,
            NumIdentificacion= "123456",
            Nombre= "Administrar",
            FechaNacimiento= fecha,
            Correo= "administrador@gmail.com",
            Telefono= "3208586814",
            Direccion= {
                Id=1,
                TipoVia= "calle",
                NumeroVia= 10,
                LetraVia= "A",
                SufijoCardinal= "34-56",
                Barrio= "admin",
                CiudadId= 1,
                CodigoPostal= "456789"
            },
            Usuario={
                Username="Admin",
                Email="admin@gmail.com",
                Password="1233456"
            }
    };
     var _passwordHasher = new PasswordHasher<Usuario>();
    UserAdministrador.Contraseña = _passwordHasher.HashPassword(UserAdministrador, "12345");
    var paciente2 = new Paciente()
    {
        Id = 1,
        Nombre = "Otros"
    };
    var Administrador = new Empleado()
    {
        Id = "123456",
        Nombre = "Admin",
        FechaNacimiento = DateOnly.FromDateTime(DateTime.Now),
        IdGenero = 1,
        IdEPS = null,
        IdARL = null
    };
    var UserAdministrador = new Proveedor()
    {
        Id = 1,
        Email = "admin@corre.com",
        UsuarioPersona = "Admin",
        IdPersona = Administrador.Id
    };
   
        var RolPersona = new Rol()
        {
            Id = 1,
            Nombre = "Persona",
            Permisos = "Basicos"
        };
    var RolAdmin = new Rol()
    {
        Id = 2,
        Nombre = "Administrador",
        Permisos = "Todos"
    };
    var AdminUsuarioRol = new UsuarioRol()
    {
        IdRol = 2,
        IdUsuario = 1
    };
    modelBuilder.Entity<Genero>().HasData(genero);
    modelBuilder.Entity<Persona>().HasData(Administrador);
    modelBuilder.Entity<Usuario>().HasData(UserAdministrador);
    modelBuilder.Entity<Rol>().HasData(RolPersona, RolAdmin);
    modelBuilder.Entity<UsuarioRol>().HasData(AdminUsuarioRol); */
}
}