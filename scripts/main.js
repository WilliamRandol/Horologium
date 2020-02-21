import Horologium from '/scripts/Horologium.js';
import MenuBar from '/scripts/MenuBar.js';
import AdHolder from '/scripts/AdHolder.js';

window.onload = () => {
    navigator.serviceWorker.register('/scripts/sw.js').then(
        registration => console.log('ServiceWorker registration successful with scope: ', registration.scope),
        err => console.log('ServiceWorker registration failed: ', err)
    );
    window.customElements.define('wmr-horologium', Horologium);
    window.customElements.define('menu-bar', MenuBar);
    window.customElements.define('ad-holder', AdHolder);
}
