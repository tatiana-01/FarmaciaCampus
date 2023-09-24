using Dominio.Entities;

namespace Dominio.Interfaces;
public interface IPaciente : IGeneric<Paciente>
{
    //nuevos metodos
    Task<IEnumerable<dynamic>> GetPacientesParacetamol();
    IEnumerable<Paciente> GetPacienteNingunaCompra2023();
    List<object> GetGastosPacientes();
}
