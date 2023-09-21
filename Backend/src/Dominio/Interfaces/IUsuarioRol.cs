using System.Linq.Expressions;
using Dominio.Entities;

namespace Dominio.Interfaces;
public interface IUsuarioRol
{
    Task<UsuarioRol> GetByIdAsync(int idUsuario, int idRol);
    //Task<IEnumerable<UsuarioRol>> GetAllAsync();
    IEnumerable<UsuarioRol> Find(Expression<Func<UsuarioRol, bool>> expression);
    Task<(int totalRegistros, IEnumerable<UsuarioRol> registros)> GetAllAsync(int pageIndex, int pageSize, string search);
    void Add(UsuarioRol entity);
    void AddRange(IEnumerable<UsuarioRol> entities);
    void Remove(UsuarioRol entity);
    void RemoveRange(IEnumerable<UsuarioRol> entities);
    void Update(UsuarioRol entity);
}
