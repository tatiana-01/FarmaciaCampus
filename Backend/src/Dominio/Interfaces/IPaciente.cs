using Dominio.Entities;

namespace Dominio.Interfaces;
public interface IPaciente : IGeneric<Paciente>
{
    //nuevos metodos
    object ConsultaPaceniteMasGastador();
    object PacientesQueCompraronParacetamolEn2023();
        
}
