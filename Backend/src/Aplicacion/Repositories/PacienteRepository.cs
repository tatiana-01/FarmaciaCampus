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
        var datos= from meds in _context.MedicamentosVendidos join venta in _context.Ventas on meds.VentaId equals venta.Id join paciente in _context.Pacientes.Include(p=>p.Usuario).Include(p=>p.Direccion).ThenInclude(p=>p.Ciudad) on venta.PacienteId equals paciente.Id select new{
            medicamento=meds.MedicamentoId,
            Id=paciente.Id,
            Nombre= paciente.Nombre,
            NumIdentificacion=paciente.NumIdentificacion,
            Correo=paciente.Correo,
            Telefono=paciente.Telefono,
            Direccion = new{
                id=paciente.Direccion != null ? paciente.Direccion.Id : 0,
                tipoVia=paciente.Direccion != null ? paciente.Direccion.TipoVia : "",
                numeroVia=paciente.Direccion != null ? paciente.Direccion.NumeroVia : 0,
                letraVia=paciente.Direccion != null ? paciente.Direccion.LetraVia : "",
                sufijoCardinal=paciente.Direccion != null ? paciente.Direccion.SufijoCardinal : "",
                barrio=paciente.Direccion != null ? paciente.Direccion.Barrio : "",
                ciudad=paciente.Direccion != null ? paciente.Direccion.Ciudad.Nombre : "",
                codigoPostal=paciente.Direccion != null ? paciente.Direccion.CodigoPostal : "",
            },
            Usuario=new{
                username=paciente.Usuario != null ? paciente.Usuario.Username : "",
                email=paciente.Usuario != null ? paciente.Usuario.Email : ""
            }
        } ;
        var Infopacientes= datos.Distinct().AsEnumerable().Where(p=>p.medicamento==paracetamol.Id);
        return Infopacientes;
    }

    public async Task<IEnumerable<Paciente>> GetPacienteNingunaCompra2023(){
        List<Paciente> pacientes= new List<Paciente>();
        var ningunaVenta=(_context.Pacientes.Select(p=>p.Id).ToArray().Except(_context.Ventas.Select(p=>p.PacienteId).ToArray())).ToArray();
            foreach (var item in ningunaVenta)
        {
            var paciente=await _context.Pacientes.Include(p=>p.Direccion).Include(p=>p.Usuario).FirstOrDefaultAsync(x=>x.Id==item);
            pacientes.Add(paciente);
        }
        return pacientes.AsEnumerable();
    }

    public List<(double CantidadGastado, int paciente)> GetGastosPacientes()
{
    List<(double CantidadGastado, int paciente)> info = new();


        var ventasGroup = _context.Ventas
            .Include(p => p.MedicamentosVendidos)
            .Where(p => p.FechaVenta.Year == 2023)
            .GroupBy(p => p.PacienteId);

        foreach (var ventas in ventasGroup)
        {
            double gastos = 0;

            foreach (var venta in ventas)
            {
                foreach (var item in venta.MedicamentosVendidos)
                {
                    gastos += item.Precio;
                }
            }

            info.Add((gastos, ventas.Key));
        }
        var pacientesCeroGastos=_context.Pacientes.Select(p=>p.Id).ToArray().Except(ventasGroup.Select(p=>p.Key).ToArray());
        foreach (var paciente in pacientesCeroGastos)
        {
            info.Add((0, paciente));
        }
        return info;
    }

    

    
}

  
