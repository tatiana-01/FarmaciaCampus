using Dominio.Entities;

namespace Dominio.Interfaces;
public interface IEmpleado : IGeneric<Empleado>
{
    //nuevos metodos
        (IEnumerable<Venta> ventas, int cantidadVentas, Empleado empleado) GetVentasPorEmpleado(string empleado);
}
