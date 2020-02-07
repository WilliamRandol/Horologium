class Horologium extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._build();
    }

    _build() {
        const clock = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const content = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
        const clocktext = document.createElement('div');
        const style = document.createElement('style');

        clock.setAttribute('viewBox', '0 0 1920 1080');
        content.setAttribute('x', '0');
        content.setAttribute('y', '12');
        content.setAttribute('width', '1920');
        content.setAttribute('height', '1080');
        clocktext.setAttribute('id', 'clocktext');
        style.innerText = this._style;

        clock.appendChild(content);
        content.appendChild(clocktext);

        this.shadowRoot.appendChild(clock);
        this.shadowRoot.appendChild(style);
    }

    _updateClock() {
        const d = new Date();
        const clocktext = this.shadowRoot.querySelector('#clocktext');

        clocktext.innerHTML =
            `<div>
                     <p>ANNUS</p>
                     <p>${this._romanize(d.getFullYear())}</p>
                 </div>
                 <div>
                     <p>MENSIS</p>
                     <p>${this._romanize(d.getMonth() + 1)}</p>
                 </div>
                 <div>
                     <xhtmlp>DOMUS</p>
                     <p>${this._romanize(d.getDate())}</p>
                 </div>
                 <div>
                     <p>HORA</p>
                     <p>${this._romanize(d.getHours())}</p>
                 </div>
                 <div>
                      <p>MINUTUS</p>
                      <p>${this._romanize(d.getMinutes())}</p>
                 </div>
                 <div>
                     <p>SECUNDUS</p>
                     <p>${this._romanize(d.getSeconds())}</p>
                 </div>`;
        setTimeout(() => this._updateClock(), 1000);
    }

    _romanize(num) {
        if (!+num)
            return '&nbsp;';
        var digits = String(+num).split(''),
            key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM',
                '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC',
                '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
            roman = '',
            i = 3;
        while (i--)
            roman = (key[+digits.pop() + (i * 10)] || '') + roman;
        return Array(+digits.join('') + 1).join('M') + roman;
    }

    get _style() {
        return `
            :host {
                margin: 3% auto;
                width: 80%;
                display: block;
            }
            #clocktext {
                box-shadow: 0.03em 0.03em 0.04em rgba(255, 255, 255, .5), -0.03em -0.03em 0.04em rgba(0, 0, 0, .5), inset 0.03em 0.03em 0.04em rgba(255, 255, 255, .5), inset -0.03em -0.03em 0.04em rgba(0, 0, 0, .5);
                background-color: rgba(255, 255, 255, .3);
                border: .05em solid rgba(0, 0, 0, .7);
                border-radius: .2em;
                color: rgba(0, 0, 0, .5);
                text-shadow: 0.02em 0.02em 0.03em rgba(255, 255, 255, .6), 0em 0em 0.02em rgba(0, 0, 0, .6);
                text-align: center;
                vertical-align: middle;
                font-size: 120px;
                margin: .03em;
            }
            
            #clocktext div { 
                display: inline-block;
                margin: .25em .5em;
            }
            
            #clocktext div p {
                margin: auto;
            }
            `;
    }

    connectedCallback() {
        this._updateClock();
    }
}


