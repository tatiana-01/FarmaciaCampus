using Dominio.Entities;

namespace Dominio.Interfaces;
public interface IMedicamentoVenta : IGeneric<MedicamentoVenta>
{
    //nuevos metodos
     Task<IEnumerable<Venta>> GetAllTotalMedicamentosVendidosAsync(DateTime fecha);
        
}
