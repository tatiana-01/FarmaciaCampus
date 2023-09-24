using Dominio.Entities;

namespace Dominio.Interfaces;
public interface IMedicamento : IGeneric<Medicamento>
{
    //nuevos metodos

    Task<IEnumerable<Medicamento>> GetMedicamentosByProveedor(string proveedor);
    IEnumerable<object> GetMenosVendido();
    IEnumerable<Medicamento> GetNuncaVendido();
    
    Task<IEnumerable<Proveedor>> GetAllProveedorContacto();
    Task<Medicamento> GetByNombreMedicamento(string medicamento);
    (List<(int CantidadVendida, int medicamento)> lstInfo,int total) GetMedicamentosPrimerTrimestre2023();

        
}
