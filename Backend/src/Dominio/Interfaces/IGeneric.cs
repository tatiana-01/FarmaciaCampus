using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Dominio.Entities;

namespace Dominio.Interfaces;
public interface IGeneric<T> where T : BaseEntity
{
    Task<T> GetByIdAsync(int id);
    Task<IEnumerable<T>> GetAllAsync();
    IEnumerable<T> Find(Expression<Func<T, bool>> expression);
    bool Exist(Expression<Func<T, bool>> expression);
    Task<int> ExecuteDeleteAsync(Expression<Func<T, bool>> expression);
    Task<(int totalRegistros, IEnumerable<T> registros)> GetAllAsync(int pageIndex, int pageSize, string search);
    void Add(T entity);
    void AddRange(IEnumerable<T> entities);
    void Remove(T entity);
    void RemoveRange(IEnumerable<T> entities);
    void Update(T entity);
    public void ConfigureUnchangedState(T entity);

}
