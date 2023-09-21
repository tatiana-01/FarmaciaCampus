using Dominio.Entities;

namespace Dominio.Interfaces;
public interface ICompra : IGeneric<Compra>
{
    //nuevos metodos
        void Update(Compra entity, Compra Anterior);
}
