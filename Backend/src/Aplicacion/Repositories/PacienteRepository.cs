using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
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
        return Infopacientes.AsEnumerable();
    }

    public IEnumerable<Paciente> GetPacienteNingunaCompra2023(){
        List<Paciente> pacientes= new List<Paciente>();
        var ningunaVenta=(_context.Pacientes.Select(p=>p.Id).ToArray().Except(_context.Ventas.Select(p=>p.PacienteId).ToArray())).ToArray();
            foreach (var item in ningunaVenta)
        {
            var paciente=_context.Pacientes.Include(p=>p.Direccion).Include(p=>p.Usuario).FirstOrDefault(x=>x.Id==item);
            pacientes.Add(paciente);
        }
        return pacientes.AsEnumerable();
    }

    public List<object> GetGastosPacientes(){

        var pacientesVentas= from venta in _context.Ventas.Include(p=>p.MedicamentosVendidos) join paciente in _context.Pacientes.Include(p=>p.Direccion) on venta.PacienteId equals paciente.Id select new{
            pacienteId=paciente.Id,
            nombrePaciente=paciente.Nombre,
            numIdentificacion=paciente.NumIdentificacion,
            direccion=paciente.Direccion,
            correo=paciente.Correo,
            telefonoPaciente=paciente.Telefono,
            fechaVenta=venta.FechaVenta,
            medicamentos=venta.MedicamentosVendidos
        };
        var ventasGroup=pacientesVentas.Where(p=>p.fechaVenta.Year==2023).GroupBy(p=>p.pacienteId);
        double gastos=0;
        List<object> info= new();
        foreach (var ventas in ventasGroup)
        {
            gastos=0;
            foreach (var venta in ventas)
            {
                foreach (var item in venta.medicamentos)
                {
                    gastos+=item.Precio;
                }
            }
            var Infopaciente=pacientesVentas.Where(p=>p.pacienteId==ventas.Key);
             info.Add(new{
                pacienteId=ventas.Key,
                
            nombrePaciente=Infopaciente.Select(p=>p.nombrePaciente),
            numIdentificacion=Infopaciente.Select(p=>p.numIdentificacion),
            direccion=Infopaciente.Select(p=>p.direccion),
            correo=Infopaciente.Select(p=>p.correo),
            telefonoPaciente=Infopaciente.Select(p=>p.telefonoPaciente),
            TotalGastado=gastos 
           });
          
        }
        return info;
    }
}