class NavbarComponent extends HTMLElement {
    constructor() {
      super();
  
      // Crear el shadow DOM
      this.attachShadow({ mode: 'open' });
  
      // Crear la estructura del navbar dentro del shadow DOM
      this.shadowRoot.innerHTML = `
        <style>
          /* Estilos CSS para el navbar */
          nav {
            background-color: #333;
            color: #fff;
          }
  
          ul {
            list-style: none;
            padding: 0;
          }
  
          li {
            display: inline;
            margin-right: 20px;
          }
  
          a {
            text-decoration: none;
            color: #fff;
          }
        </style>
        <nav>
          <ul>
            <li><a id="inicio" href="#">Inicio</a></li>
            <li><a id="acerca" href="#">Acerca</a></li>
            <li><a id="contacto" href="#">Contacto</a></li>
          </ul>
        </nav>
      `;
  
      // Obtener los elementos de enlace del navbar
      this.inicioLink = this.shadowRoot.getElementById('inicio');
      this.acercaLink = this.shadowRoot.getElementById('acerca');
      this.contactoLink = this.shadowRoot.getElementById('contacto');
  
      // Añadir eventos de clic a los enlaces
      this.inicioLink.addEventListener('click', () => this.navigateTo('index.html'));
      this.acercaLink.addEventListener('click', () => this.navigateTo('acerca.html'));
      this.contactoLink.addEventListener('click', () => this.navigateTo('contacto.html'));
  
      // Actualizar los enlaces según la ubicación actual
      this.updateLinks();
    }
  
    // Función para navegar a una página
    navigateTo(page) {
      window.location.href = page;
    }
  
    // Función para actualizar los enlaces según la ubicación actual
    updateLinks() {
      const currentURL = window.location.pathname;
  
      this.inicioLink.href = currentURL === '/index.html' ? 'index.html' : '../index.html';
      this.acercaLink.href = currentURL === '/acerca.html' ? 'acerca.html' : '../acerca.html';
      this.contactoLink.href = currentURL === '/contacto.html' ? 'contacto.html' : '../contacto.html';
    }
  }
  
  // Registrar el Web Component
  customElements.define('navbar-component', NavbarComponent);