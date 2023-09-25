class SideBar extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        const link = document.createElement("link");
        const link2 = document.createElement("link");
        const script = document.createElement("script");

        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '../style.css');

        link2.setAttribute('rel', 'stylesheet');
        link2.setAttribute('href', 'https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css');

        script.setAttribute('src', '../main.js');

        this.shadowRoot.appendChild(link);
        this.shadowRoot.appendChild(link2);

        this.shadowRoot.innerHTML +=
            `<section id="sidebar">
		<a href="#" class="brand"><i class='bx bxs-smile icon'></i> AdminSite</a>
		<ul class="side-menu">
			<li><a href="#" class="active"><i class='bx bxs-dashboard icon' ></i> Dashboard</a></li>
			<li class="divider" data-text="main">Main</li>
			<li>
				<a href="#"><i class='bx bxs-inbox icon' ></i> Opciones <i class='bx bx-chevron-right icon-right' ></i></a>
				<ul class="side-dropdown">
					<li><a id="empleadoLink" href="#">Empleados</a></li>
					<li><a id="pacienteLink" href="#">Pacientes</a></li>
					<li><a id="proveedoreLink" href="#">Proveedores</a></li>
					<li><a id="ventaLink" href="#">Ventas</a></li>
					<li><a id="comprasLink" href="#">Compras</a></li>
				</ul>
			</li>
			<li><a href="#"><i class='bx bxs-chart icon' ></i> Charts</a></li>
			<li><a href="#"><i class='bx bxs-widget icon' ></i> Widgets</a></li>
			<li class="divider" data-text="table and forms">Table and forms</li>
			<li><a href="#"><i class='bx bx-table icon' ></i> Tables</a></li>
			<li>
				<a href="#"><i class='bx bxs-notepad icon' ></i> Forms <i class='bx bx-chevron-right icon-right' ></i></a>
				<ul class="side-dropdown">
					<li><a href="#">Basic</a></li>
					<li><a href="#">Select</a></li>
					<li><a href="#">Checkbox</a></li>
					<li><a href="#">Radio</a></li>
				</ul>
			</li>
		</ul>
	</section>`;

        //this.shadowRoot.appendChild(script);
        this.funcionalidad();
        this.brandLink = this.shadowRoot.querySelector(".brand");
        this.empleadoLink = this.shadowRoot.getElementById("empleadoLink");
        this.pacienteLink = this.shadowRoot.getElementById("pacienteLink");
        this.proveedoreLink = this.shadowRoot.getElementById("proveedoreLink");
        this.ventaLink = this.shadowRoot.getElementById("ventaLink");
        this.comprasLink = this.shadowRoot.getElementById("comprasLink");

        this.brandLink.addEventListener("click", () => this.navigateTo("../index.html"));
        this.empleadoLink.addEventListener("click", () => this.navigateTo("empleado.html"));
        this.pacienteLink.addEventListener("click", () => this.navigateTo("paciente.html"));
        this.proveedoreLink.addEventListener("click", () => this.navigateTo("proveedor.html"));
        this.ventaLink.addEventListener("click", () => this.navigateTo("ventas.html"));
        this.comprasLink.addEventListener("click", () => this.navigateTo("compras.html"));
    }
    navigateTo(page) {
        window.location = page;
    }
    funcionalidad() {
        const allDropdown = this.shadowRoot.querySelectorAll('#sidebar .side-dropdown');
        const sidebar = this.shadowRoot.getElementById('sidebar');
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
    }

}
window.customElements.define("side-bar", SideBar);