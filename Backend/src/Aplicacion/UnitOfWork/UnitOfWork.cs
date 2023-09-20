using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Aplicacion.Repositories;
using Dominio.Entities;
using Dominio.Interfaces;
using Persistencia;

namespace Aplicacion.UnitOfWork;
public class UnitOfWork : IUnitOfWork, IDisposable
{
     private readonly FarmaciaContext context;
    private UsuarioRepository _usuarios;
    private RolRepository _roles;
    private CiudadRepository _ciudades;
    private CompraRepository _compras;
    private DepartamentoRepository _departamentos;
    private DireccionRepository _direcciones;
    private EmpleadoRepository _empleados;
    private MedicamentoRepository _medicamentos;
    private MedicamentoCompraRepository _medicamentosComprados;
    private MedicamentoVentaRepository _medicamentosVendidos;
    private PacienteRepository _pacientes;
    private PaisRepository _paises;
    private ProveedorRepository _poveedores;
    private VentaRepository _ventas;
    private UsuarioRolRepository _usuariosRoles;
     public UnitOfWork(FarmaciaContext _context)
    {
        context = _context;
    }

     public IUsuario Usuarios {
        get{
            if(_usuarios==null){
                _usuarios= new UsuarioRepository(context);
            }
            return _usuarios;
        }
     }
    public IRol Roles {
        get{
            if(_roles==null){
                _roles= new RolRepository(context);
            }
            return _roles;
        }
    }

    public ICiudad Ciudades
    {
        get
        {
            if (_ciudades == null)
            {
                _ciudades = new CiudadRepository(context);
            }
            return _ciudades;
        }
    }

    public ICompra Compras
    {
        get
        {
            if (_compras == null)
            {
                _compras = new CompraRepository(context);
            }
            return _compras;
        }
    }   

    public IDepartamento Departamentos
    {
        get
        {
            if (_departamentos == null)
            {
                _departamentos = new DepartamentoRepository(context);
            }
            return _departamentos;
        }
    }

    public IDireccion Direcciones
    {
        get
        {
            if (_direcciones == null)
            {
                _direcciones = new DireccionRepository(context);
            }
            return _direcciones;
        }
    }

    public IEmpleado Empleados
    {
        get
        {
            if (_empleados == null)
            {
                _empleados = new EmpleadoRepository(context);
            }
            return _empleados;
        }
    }
    public IMedicamento Medicamentos
    {
        get
        {
            if (_medicamentos == null)
            {
                _medicamentos = new MedicamentoRepository(context);
            }
            return _medicamentos;
        }
    }

    
    public IMedicamentoCompra MedicamentosComprados
    {
        get
        {
            if (_medicamentosComprados == null)
            {
                _medicamentosComprados = new MedicamentoCompraRepository(context);
            }
            return _medicamentosComprados;
        }
    }

    public IMedicamentoVenta MedicamentosVendidos
    {
        get
        {
            if (_medicamentosVendidos == null)
            {
                _medicamentosVendidos = new MedicamentoVentaRepository(context);
            }
            return _medicamentosVendidos;
        }
    }   

    public IPaciente Pacientes
    {
        get
        {
            if (_pacientes == null)
            {
                _pacientes = new PacienteRepository(context);
            }
            return _pacientes;
        }
    }

    
    public IPais Paises
    {
        get
        {
            if (_paises == null)
            {
                _paises = new PaisRepository(context);
            }
            return _paises;
        }
    }

    public IProveedor Proveedores
    {
        get
        {
            if (_poveedores == null)
            {
                _poveedores = new ProveedorRepository(context);
            }
            return _poveedores;
        }
    }

    
    public IVenta Ventas
    {
        get
        {
            if (_ventas == null)
            {
                _ventas = new VentaRepository(context);
            }
            return _ventas;
        }
    }

    
    public IUsuarioRol UsuariosRoles
    {
        get
        {
            if (_usuariosRoles == null)
            {
                _usuariosRoles = new UsuarioRolRepository(context);
            }
            return _usuariosRoles;
        }
    }
    public void Dispose()
    {
        context.Dispose();
    }

    public async Task<int> SaveAsync()
    {
         return await context.SaveChangesAsync();
    }
}
