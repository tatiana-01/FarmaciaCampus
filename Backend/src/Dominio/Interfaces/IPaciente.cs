using Dominio.Entities;

namespace Dominio.Interfaces;
public interface IPaciente : IGeneric<Paciente>
{
    //nuevos metodos
    object ConsultaPaceniteMasGastador();
    object PacientesQueCompraronParacetamolEn2023();
    Task<IEnumerable<object>> GetPacientesParacetamol();
    Task<IEnumerable<Paciente>> GetPacienteNingunaCompra2023();
    List<(double CantidadGastado, int paciente)> GetGastosPacientes();
}
