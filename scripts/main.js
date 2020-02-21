import Horologium from '/scripts/Horologium.js';
import MenuBar from '/scripts/MenuBar.js';
import AdHolder from '/scripts/AdHolder.js';

window.customElements.define('wmr-horologium', Horologium);
window.customElements.define('menu-bar', MenuBar);
window.customElements.define('ad-holder', AdHolder);
window.onload = () => {
    'use strict';
  
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('./sw.js');
    }
  }
