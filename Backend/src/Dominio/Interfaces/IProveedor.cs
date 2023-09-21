using Dominio.Entities;

namespace Dominio.Interfaces;
public interface IProveedor : IGeneric<Proveedor>
{
    //nuevos metodos
    Task<IEnumerable<Proveedor>> GetAllAsync();
        
}
