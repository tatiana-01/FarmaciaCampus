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
    public object ConsultaPaceniteMasGastador()
    {
        var listaPacientes = _context.Pacientes.ToList();
        var listaVentas = _context.Ventas.ToList();
        var listaVentaMedicamentos = _context.MedicamentosVendidos.ToList();

        var query = 
            (from paciente in listaPacientes
            join venta in listaVentas on paciente.Id equals venta.PacienteId
            join ventaMedicamento in listaVentaMedicamentos on venta.Id equals ventaMedicamento.VentaId
            group ventaMedicamento by paciente into g 
            let totalGastado = g.Sum(vm =>vm.Precio)
            orderby totalGastado descending
            select new
            {
                Paciente = g.Key,
                TotalGastado = totalGastado
            }).FirstOrDefault(); 

            return query;
    }
}