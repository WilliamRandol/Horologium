export class AdHolder extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(this._template.content.cloneNode(true));
    }

    get _style() {
        return `
        <style>
        :host {
            position:absolute;
            overflow:visible;
            bottom:0;
            opacity:.8;
            width:100%;
            height: auto;
        }
        
        #adBlock {
            display: block;
            position: relative;
            overflow: visible;
            width: 234px;
            height: 0;
            bottom: 0;
            margin: auto;
            transition: height .5s;
        }

        #adBlock:hover {
            height: 68px;
        }
        
        #adBlockOpen {
            background-color: #000;
            color: rgba(255,255,255,.5);
            width: 80px;
            height: 4px;
            padding: 4px 0 0 0;
            margin: auto;
            font-weight: bold;
            font-family: ariel, san-serif;
            text-align: center;
            line-height: 0;
            border-radius: 6px 6px 0 0;
            cursor: default;
            position: relative;
            top: -8px;
        }
        
        #adBlockOpen p {
            margin-top:-4px;
        }
        </style>
        `;
    }

    get _template() {
        const template = document.createElement('template');
        template.innerHTML = `
        <div id="adBlock">
            <div id="adBlockOpen">
                <p>. . . . .</p>
            </div>
            <!--<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>-->
            <!-- Horologium -->
            <!--<ins class="adsbygoogle" style="display:inline-block;width:234px;height:60px"
                data-ad-client="ca-pub-8592241669619117" data-ad-slot="8542544241"></ins>
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
            </script>-->
        </div>
        ${this._style}
        `;
        return template;
    }
}