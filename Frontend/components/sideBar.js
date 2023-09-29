class SideBar extends HTMLElement {
    constructor() {
        super();

        this.render();
        //this.funcionalidad();
       // this.links();

        /* const link = document.createElement("link");
        const link2 = document.createElement("link");
       

        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '../style.css');

        link2.setAttribute('rel', 'stylesheet');
        link2.setAttribute('href', 'https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css');

       

        document.appendChild(link);
        document.appendChild(link2); */


       // this.links()
        //
        //this.funcionalidad();

    }

    render() {
        this.innerHTML +=
            `
    <a href="../index.html" class="brand"><i class='bx bxs-smile icon'></i> AdminSite</a>
    <ul class="side-menu">
        <li><a href="../index.html" class="active"><i class='bx bxs-dashboard icon' ></i> Dashboard</a></li>
        <li class="divider" data-text="main">Main</li>
        <li>
            <a href="#"><i class='bx bxs-inbox icon' ></i> Opciones <i class='bx bx-chevron-right icon-right' ></i></a>
            <ul class="side-dropdown">
                <li><a id="empleadoLink" href="empleado.html">Empleados</a></li>
                <li><a id="pacienteLink" href="paciente.html">Pacientes</a></li>
                <li><a id="proveedoreLink" href="proveedor.html">Proveedores</a></li>
                <li><a id="ventaLink" href="ventas.html"">Ventas</a></li>
                <li><a id="usuariosLink" href="usuarios.html">Usuarios</a></li>
                <li><a id="comprasLink" href="compras.html">Compras</a></li>
                <li><a id="medicamentosLink" href="medicamento.html">Medicamentos</a></li>
            </ul>
        </li>
        <li>
            <a href="#"><i class='bx bxs-inbox icon' ></i> Ubicación <i class='bx bx-chevron-right icon-right' ></i></a>
            <ul class="side-dropdown">
                <li><a  href="#">Pais</a></li>
                <li><a  href="departamento.html">Departamento</a></li>
                <li><a  href="#">Ciudad</a></li>
            </ul>
        </li>
        <li><a href="estadisticas.html"><i class='bx bxs-widget icon' ></i> Estadisticas</a></li>
        <li class="divider" data-text="OTRAS CONSULTAS">OTRAS CONSULTAS</li>
        <!--<li><a href="#"><i class='bx bx-table icon' ></i> Tables</a></li>-->
        <li>
            <a href="#"><i class='bx bxs-notepad icon' ></i>MEDICAMENTOS<i class='bx bx-chevron-right icon-right' ></i></a>
            <ul class="side-dropdown">
            <li><a class="noLine" href="consulta2.html">Paracetamol</a></li>
            <li><a class="noLine" href="recaudo.html">ventas-fecha-total</a></li>
            <li><a class="noLine" href="50Unidades.html">Menos de 50 unidades</a></li>
            <li><a class="noLine" href="VendidosDespues.html">Vendidos despues del 1 enero 2023</a></li>
            <li><a class="noLine" href="caducanAntes2024.html">caducan antes del 2024</a></li>
            <li><a class="noLine" href="medsByProveedor.html">medicamentos por proveedor</a></li>
            </ul>
        </li>
    </ul>
`;
//this.funcionalidad();
   /*  const script = document.createElement("script");
        script.setAttribute('src', '../main.js');
        document.querySelector('body').appendChild(script); */
    }
    links() {
        this.brandLink = document.querySelector(".brand");
        this.empleadoLink = document.getElementById("empleadoLink");
        this.pacienteLink = document.getElementById("pacienteLink");
        this.proveedoreLink = document.getElementById("proveedoreLink");
        this.ventaLink = document.getElementById("ventaLink");
        this.comprasLink = document.getElementById("comprasLink");
        this.comprasLink = document.getElementById("comprasLink");

        this.brandLink.addEventListener("click", () => this.navigateTo("../index.html"));
        this.empleadoLink.addEventListener("click", () => this.navigateTo("empleado.html"));
        this.pacienteLink.addEventListener("click", () => this.navigateTo("paciente.html"));
        this.proveedoreLink.addEventListener("click", () => this.navigateTo("proveedor.html"));
        this.ventaLink.addEventListener("click", () => this.navigateTo("ventas.html"));
        this.comprasLink.addEventListener("click", () => this.navigateTo("compras.html"));
        this.usuariosLink.addEventListener("click", () => this.navigateTo("usuarios.html"));
        this.comprasLink.addEventListener("click", () => this.navigateTo("compras.html"));
    }
    navigateTo(page) {
        window.location = page;
    }
    funcionalidad() {
        const allDropdown = document.querySelectorAll('#sidebar .side-dropdown');
        const sidebar = document.getElementById('sidebar');
        console.log(sidebar);
        allDropdown.forEach(item => {
            const a = item.parentElement.querySelector('a:first-child');
            a.addEventListener('click', function (e) {
                e.preventDefault();

                if (!this.classList.contains('active')) {
                    allDropdown.forEach(i => {
                        const aLink = i.parentElement.querySelector('a:first-child');

                        aLink.classList.remove('active');
                        i.classList.remove('show');
                    })
                }

                this.classList.toggle('active');
                item.classList.toggle('show');
            })
        })

        const toggleSidebar = document.querySelector('nav .toggle-sidebar');
        const allSideDivider = document.querySelectorAll('#sidebar .divider');
        if (sidebar.classList.contains('hide')) {
            allSideDivider.forEach(item => {
                item.textContent = '-'
            })
            allDropdown.forEach(item => {
                const a = item.parentElement.querySelector('a:first-child');
                a.classList.remove('active');
                item.classList.remove('show');
            })
        } else {
            allSideDivider.forEach(item => {
                item.textContent = item.dataset.text;
            })
        }
        toggleSidebar.addEventListener('click', function () {
            sidebar.classList.toggle('hide');
            toggleSidebar.classList.toggle('ya')
            if (sidebar.classList.contains('hide')) {
                allSideDivider.forEach(item => {
                    item.textContent = '-'
                })

                allDropdown.forEach(item => {
                    const a = item.parentElement.querySelector('a:first-child');
                    a.classList.remove('active');
                    item.classList.remove('show');
                })
            } else {
                allSideDivider.forEach(item => {
                    item.textContent = item.dataset.text;
                })
            }
        })
        sidebar.addEventListener('mouseleave', function () {
            if (this.classList.contains('hide')) {
                allDropdown.forEach(item => {
                    const a = item.parentElement.querySelector('a:first-child');
                    a.classList.remove('active');
                    item.classList.remove('show');
                })
                allSideDivider.forEach(item => {
                    item.textContent = '-'
                })
            }
        })
        sidebar.addEventListener('mouseenter', function () {
            if (this.classList.contains('hide')) {
                allDropdown.forEach(item => {
                    const a = item.parentElement.querySelector('a:first-child');
                    a.classList.remove('active');
                    item.classList.remove('show');
                })
                allSideDivider.forEach(item => {
                    item.textContent = item.dataset.text;
                })
            }
        })
    }
}
window.customElements.define("side-bar", SideBar);