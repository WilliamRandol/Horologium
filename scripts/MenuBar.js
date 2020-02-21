export default class MenuBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(this._template.content.cloneNode(true));
    }
    get _style() {
        return `
        <style>
        :host {
            position: fixed;
            width: 100vw;
            height: 0;
            overflow: visible;
        }

        #menu {
            position: relative;
            margin: auto;
            text-align: center;
            background-color: rgba(0, 0, 0, .5);
            border-radius: 0 0 6px 6px;
            white-space: nowrap;
            width: 100px;
            transition: top .5s;
            display: block;
            box-sizing: border-box;
            top: -26px;
        }

        #menu:hover {
            top: 0;
        }
        
        a {
            margin:5px 0;
        }
        
        #menuHandle {
            position: relative;
            background-color: rgba(0,0,0,.5);
            color: rgba(255,255,255,.5);
            width: 80px;
            height: 4px;
            padding: 0 0 4px 0;
            font-weight: bold;
            font-family: ariel, san-serif;
            text-align: center;
            line-height: 0;
            border-radius: 0 0 6px 6px;
            cursor: default;
            display: block;
            margin: auto;
            bottom: -8px;
        }
        </style>
        `;
    }
    get _template() {
        const template = document.createElement('template');
        template.innerHTML = `
            <div id="menu">
                <a href="#info" type="image" class="info" title="Information">Info</a>
                <div id="menuHandle">. . . . .</div>
            </div>
            ${this._style}
        `;
        return template;
    }
}
