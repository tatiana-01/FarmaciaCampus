using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using Persistencia.Data.Configuration;

namespace Aplicacion.Repositories;
public class MedicamentoRepository : GenericRepository<Medicamento>, IMedicamento
{
    private readonly FarmaciaContext _context;

    public MedicamentoRepository(FarmaciaContext context) : base(context)
    {
        _context = context;
    }

    public override async Task<IEnumerable<Medicamento>> GetAllAsync()
    {
        return await _context.Set<Medicamento>()
        .Include(p => p.MedicamentosComprados)
        .Include(p => p.MedicamentosVendidos)
        .ToListAsync();
    }
    public override IEnumerable<Medicamento> Find(Expression<Func<Medicamento, bool>> expression)
    {
        return  _context.Set<Medicamento>().Where(expression)
            .Include(x =>x.MedicamentosVendidos)
            .Include(x => x.MedicamentosComprados)
            .Include( x =>x.Proveedor)
            .ToList();
    }

    public override async Task<Medicamento> GetByIdAsync(int id)
    {
        return await _context.Set<Medicamento>()
        .Include(p => p.MedicamentosComprados)
        .Include(p => p.MedicamentosVendidos)
        .FirstOrDefaultAsync(p => p.Id == id);
    }

    public override async Task<(int totalRegistros, IEnumerable<Medicamento> registros)> GetAllAsync(int pageIndex, int pageSize, string search)
    {
        var query = _context.Medicamentos as IQueryable<Medicamento>;

        if (!string.IsNullOrEmpty(search)) 
        {
            query = query.Where(p => p.Nombre.ToLower().Contains(search.ToLower()));
        }

        var totalRegistros=await query.CountAsync();
        var registros = await query
                                .Include(p => p.MedicamentosComprados)
                                .Include(p => p.MedicamentosVendidos)
                                .Skip((pageIndex-1)*pageSize)
                                .Take(pageSize)
                                .ToListAsync();
                                
        return (totalRegistros,registros);
    }
    
    public async Task<IEnumerable<Medicamento>> GetMedicamentosByProveedor(string proveedor){
        var infoProveedor= await  _context.Proveedores.FirstOrDefaultAsync(p=>p.Nombre.ToLower().Contains(proveedor.ToLower()));
        if(infoProveedor==null) return null;
        var medicamentos=_context.Medicamentos.Where(p=>p.ProveedorId==infoProveedor.Id);
        return medicamentos;
    }

    public async Task<IEnumerable<object>> GetPacientesParacetamol(){
        var paracetamol = await _context.Medicamentos.FirstOrDefaultAsync(p=>p.Nombre.ToLower()=="paracetamol"); 
        //var ventasMedicamento= _context.MedicamentosVendidos.Where(p=>p.MedicamentoId==2);
        var datos= from meds in _context.MedicamentosVendidos join venta in _context.Ventas on meds.VentaId equals venta.Id join paciente in _context.Pacientes on venta.PacienteId equals paciente.Id select new{
            Id=paciente.Id,
            Nombre= paciente.Nombre,
            NumIdentificacion=paciente.NumIdentificacion,
            Correo=paciente.Correo,
            Telefono=paciente.Telefono,
            medicamento=meds.MedicamentoId,
            
        } ;
        var Infopacientes= datos.Where(p=>p.medicamento==paracetamol.Id).Distinct().AsEnumerable();
   
       /*  var pacientes= from paciente in _context.Pacientes join Id in IdPaciente.AsEnumerable() on paciente.Id equals Id.paciente select new {
            Id=paciente.Id,
            Nombre= paciente.Nombre,
            NumIdentificacion=paciente.NumIdentificacion,
            Correo=paciente.Correo,
            Telefono=paciente.Telefono,
            //Ventas= _context.Ventas.Where(p=>p.Id==Id.venta).AsEnumerable()
        }; */
        //var medicamentos=_context.Medicamentos.Where(p=>p.ProveedorId==infoProveedor.Id);
        return Infopacientes.AsEnumerable();
    }
      
}