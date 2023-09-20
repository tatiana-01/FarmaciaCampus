using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistencia;

namespace Aplicacion.Repositories;
public class UsuarioRolRepository : IUsuarioRol
{
    private readonly FarmaciaContext _context;

    public UsuarioRolRepository(FarmaciaContext context)
    {
        _context = context;
    }

     public virtual void Add(UsuarioRol entity)
        {
            _context.Set<UsuarioRol>().Add(entity);
        }
    
        public virtual void AddRange(IEnumerable<UsuarioRol> entities)
        {
            _context.Set<UsuarioRol>().AddRange(entities);
        }
    
        public virtual IEnumerable<UsuarioRol> Find(Expression<Func<UsuarioRol, bool>> expression)
        {
            return _context.Set<UsuarioRol>().Where(expression);
        }
    
         public virtual async Task<(int totalRegistros, IEnumerable<UsuarioRol> registros)> GetAllAsync(int pageIndex, int pageSize, string search)
        {
            var query = _context.UsuariosRoles as IQueryable<UsuarioRol>;
            var totalRegistros = await query.CountAsync();
            var registros = await query
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            return (totalRegistros, registros);
        }
    
        public virtual async Task<UsuarioRol> GetByIdAsync(int idUsuario, int idRol)
        {
            return await _context.Set<UsuarioRol>().FirstOrDefaultAsync(x=>x.RolId==idRol &&  x.UsuarioId==idUsuario);
        }
    
        public virtual Task<UsuarioRol> GetByIdAsync(string id)
        {
            throw new NotImplementedException();
        }
    
        public virtual void Remove(UsuarioRol entity)
        {
            _context.Set<UsuarioRol>().Remove(entity);
        }
    
        public virtual void RemoveRange(IEnumerable<UsuarioRol> entities)
        {
            _context.Set<UsuarioRol>().RemoveRange(entities);
        }
    
        public virtual void Update(UsuarioRol entity)
        {
            _context.Set<UsuarioRol>()
                .Update(entity);
        }
}