using Dominio.Entities;

namespace Dominio.Interfaces;
public interface IVenta : IGeneric<Venta>
{
    //nuevos metodos
    Task<IEnumerable<Venta>> GetAllMedicamentoPorFechaAsync(DateTime fecha);
    Task<IEnumerable<Empleado>> GetAllEmpleadoMasVentasAsync(int ventas);
    Task<IEnumerable<Empleado>> GetAllEmpleadoSinVentasAsync(DateTime year);

}
