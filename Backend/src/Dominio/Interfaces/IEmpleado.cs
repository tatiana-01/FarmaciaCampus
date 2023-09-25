using Dominio.Entities;

namespace Dominio.Interfaces;
public interface IEmpleado : IGeneric<Empleado>
{
    //nuevos metodos
    IEnumerable<Empleado> GetVentasEmpleados();
    IEnumerable<Empleado> GetEmpleadosMenosDe5Ventas();object EmpleadosNoVendieronEn2023();
}
