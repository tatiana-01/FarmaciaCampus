using Dominio.Entities;

namespace Dominio.Interfaces;
public interface IMedicamentoVenta : IGeneric<MedicamentoVenta>
{
    //nuevos metodos
       object MedicamentosVenndidosPorMesEn2023();
       object MedicamentosNoVendidos2023();
}
