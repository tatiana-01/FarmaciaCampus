using Dominio.Entities;

namespace Dominio.Interfaces;
public interface IMedicamento : IGeneric<Medicamento>
{
    //nuevos metodos

    Task<IEnumerable<Medicamento>> GetMedicamentosByProveedor(string proveedor);
    IEnumerable<object> GetMenosVendido();
    IEnumerable<Medicamento> GetNuncaVendido();
    
        
}
