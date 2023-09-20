using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dominio.Interfaces;
    public interface IUnitOfWork
    {
        ICiudad Ciudades { get; }
        ICompra Compras { get; }
        IDepartamento Departamentos { get; }
        IDireccion Direcciones { get; }
        IEmpleado Empleados { get; }
        IMedicamento Medicamentos { get; }
        IMedicamentoCompra MedicamentosComprados { get; }
        IMedicamentoVenta MedicamentosVendidos { get; }
        IPaciente Pacientes { get; }
        IPais Paises { get; }
        IProveedor Proveedores { get; }
        IVenta Ventas { get; }
        IUsuarioRol UsuariosRoles { get; }
        IUsuario Usuarios { get; }
        IRol Roles { get; }
        Task<int> SaveAsync();
    }
