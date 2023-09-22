using Dominio.Entities;

namespace Dominio.Interfaces;
public interface IMedicamento : IGeneric<Medicamento>
{
    //nuevos metodos
    Task<IEnumerable<Proveedor>> GetAllProveedorContacto();
    Task<Medicamento> GetByNombreMedicamento(string medicamento);
        
}
