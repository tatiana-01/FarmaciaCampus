using Dominio.Entities;

namespace Dominio.Interfaces;
public interface IProveedor : IGeneric<Proveedor>
{
    //nuevos metodos
    Task<IEnumerable<Proveedor>> GetAllProveedorMedicAsync();
    Task<object> ProveedoresSinVentas();
    IQueryable ProveedoresQueVendieronEn2023();
    Task<IEnumerable<Proveedor>> GetAllProveedoreMedicMenosStockAsync(int stock);

     IEnumerable<object> GetProveedorMenosCompras();
        
}
