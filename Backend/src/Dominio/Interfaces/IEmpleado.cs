using Dominio.Entities;

namespace Dominio.Interfaces;
public interface IEmpleado : IGeneric<Empleado>
{
    //nuevos metodos
        object EmpleadosNoVendieronEn2023();
}
