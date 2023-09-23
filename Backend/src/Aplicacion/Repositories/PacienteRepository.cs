using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistencia;

namespace Aplicacion.Repositories;
public class PacienteRepository : GenericRepository<Paciente>, IPaciente
{
    private readonly FarmaciaContext _context;

    public PacienteRepository(FarmaciaContext context) : base(context)
    {
        _context = context;
    }
     public override async Task<IEnumerable<Paciente>> GetAllAsync()
     {
        return await _context.Pacientes
            .Include(p =>p.Usuario)
            .Include(p =>p.Direccion)
            .ToListAsync();
     }
      public override async Task<Paciente> GetByIdAsync(int id)
    {
        return await _context.Pacientes
        .Include(e =>e.Usuario)
        .Include(e =>e.Direccion)
        .FirstOrDefaultAsync(e =>e.Id == id);   
    }

    public async Task<IEnumerable<object>> GetPacientesParacetamol(){
        var paracetamol = await _context.Medicamentos.FirstOrDefaultAsync(p=>p.Nombre.ToLower()=="paracetamol"); 
        //var ventasMedicamento= _context.MedicamentosVendidos.Where(p=>p.MedicamentoId==2);
        var datos= from meds in _context.MedicamentosVendidos join venta in _context.Ventas on meds.VentaId equals venta.Id join paciente in _context.Pacientes.Include(p=>p.Direccion).Include(p=>p.Usuario) on venta.PacienteId equals paciente.Id select new{
            medicamento=meds.MedicamentoId,
            Id=paciente.Id,
            Nombre= paciente.Nombre,
            NumIdentificacion=paciente.NumIdentificacion,
            Correo=paciente.Correo,
            Telefono=paciente.Telefono,
            Direccion=paciente.Direccion,
            Usuario=paciente.Usuario
        } ;
        var Infopacientes= datos.Distinct().AsEnumerable().Where(p=>p.medicamento==paracetamol.Id);
   
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