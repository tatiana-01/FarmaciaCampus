using Dominio.Entities;

namespace Dominio.Interfaces;
public interface IMedicamentoVenta : IGeneric<MedicamentoVenta>
{
    //nuevos metodos
    Task<IEnumerable<Venta>> GetAllTotalMedicamentosVendidosAsync(DateTime fecha);
   object MedicamentosVenndidosPorMesEn2023();
       object MedicamentosNoVendidos2023();IEnumerable<object> GetCalcularPromedioPorVentas();
}
