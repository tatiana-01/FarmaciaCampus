class NavBar extends HTMLElement {
    constructor() {
        super();
        this.render();
        this.funcionalidad();
    }

    render() {
        this.innerHTML = `
        <nav>
        <i class='bx bx-menu toggle-sidebar'></i>
        <form action="#">
            
        </form>
        
        <span class="divider"></span>
        <div class="profile">
            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="">
            <ul class="profile-link">
                <li><a href="#"><i class='bx bxs-user-circle icon' ></i> Profile</a></li>
                <li><a href="#"><i class='bx bxs-cog' ></i> Settings</a></li>
                <li><a href="#"><i class='bx bxs-log-out-circle' ></i> Logout</a></li>
            </ul>
        </div>
    </nav>`

    }
    funcionalidad() {
        const profile = document.querySelector('nav .profile');
        const imgProfile = profile.querySelector('img');
        const dropdownProfile = profile.querySelector('.profile-link');
        imgProfile.addEventListener('click', function () {
            dropdownProfile.classList.toggle('show');
        })
        // MENU
        const allMenu = document.querySelectorAll('main .content-data .head .menu');
        allMenu.forEach(item => {
            const icon = item.querySelector('.icon');
            const menuLink = item.querySelector('.menu-link');

            icon.addEventListener('click', function () {
                menuLink.classList.toggle('show');
            })
        })
        window.addEventListener('click', function (e) {
            if (e.target !== imgProfile) {
                if (e.target !== dropdownProfile) {
                    if (dropdownProfile.classList.contains('show')) {
                        dropdownProfile.classList.remove('show');
                    }
                }
            }

            allMenu.forEach(item => {
                const icon = item.querySelector('.icon');
                const menuLink = item.querySelector('.menu-link');

                if (e.target !== icon) {
                    if (e.target !== menuLink) {
                        if (menuLink.classList.contains('show')) {
                            menuLink.classList.remove('show')
                        }
                    }
                }
            })
        })
    }
}
window.customElements.define("nav-bar", NavBar);