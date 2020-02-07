class Horologium extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(this._template.content.cloneNode(true));
        this._updateClock();
    }

    _updateClock() {
        const d = new Date();
        this._dateTimeParts.forEach((dtp) => this._setValue(d, dtp));
        setTimeout(() => this._updateClock(), 1000);
    }

    _setValue(date, dateTimePart){
        const romanizedValue = this._romanize(this._getDateTimePartValue(date, dateTimePart));
        if(this.shadowRoot.querySelector('#' + dateTimePart).innerHTML != romanizedValue){
            this.shadowRoot.querySelector('#' + dateTimePart).innerHTML = romanizedValue;
        }
    }

    _getDateTimePartValue(date, dateTimePart){
        switch (dateTimePart){
            case 'year':
                return date.getFullYear();
            case 'month':
                return date.getMonth() + 1;
            case 'day':
                return date.getDate();
            case 'hour':
                return date.getHours();
            case 'minute':
                return date.getMinutes();
            case 'second':
                return date.getSeconds();
            default:
                return 0;
        }
    }

    _romanize(num) {
        if (!num) return '&nbsp;';

        const digits = String(num).split('');
        const key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM',
                     '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC',
                     '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
        
        let roman = '';
        let i = 3;

        while (i--) roman = (key[+digits.pop() + (i * 10)] || '') + roman;

        return Array(+digits.join('') + 1).join('M') + roman;
    }

    get _style() {
        return `
        <style>
            @import url("https://use.typekit.net/xce4phg.css");
            :host {
                display: block;
            }
            #clocktext {
                background-color: rgba(255, 255, 255, .3);
                box-shadow: 3px 3px 4px rgba(255, 255, 255, .5),
                            -3px -3px 4px rgba(0, 0, 0, .5),
                            inset 3px 3px 4px rgba(255, 255, 255, .5),
                            inset -3px -3px 4px rgba(0, 0, 0, .5);
                border: .05em solid rgba(0, 0, 0, .7);
                border-radius: 20px;
                margin: 6px;

                color: rgba(0, 0, 0, .5);
                text-shadow: 2px 2px 3px rgba(255, 255, 255, .6),
                             0em 0em 2px rgba(0, 0, 0, .6);
                text-transform: uppercase;
                text-align: center;
                font-size: 127px;
                font-family: trajan-pro-3, serif;
                font-weight: 400;
                font-style: normal;
            }
            
            #clocktext div { 
                display: inline-block;
                margin: 23px 50px;
            }
            
            #clocktext div p {
                margin: 0;
            }
        </style>
        `;
    }

    get _template() {
        const template = document.createElement('template');
        template.innerHTML = `
        <svg viewBox="0 0 1920 1080">
            <foreignObject x="0" y="0" width="1920" height="1080">
                <div id="clocktext" lang="la">
                    <div>
                        <p>anno</p>
                        <p id="year"></p>
                    </div>
                    <div>
                        <p>mensis</p>
                        <p id="month"></p>
                    </div>
                    <div>
                        <p>diebus<p></p>
                        <p id="day"></p>
                    </xhtmlp></div>
                    <div>
                        <div>
                            <p>hora</p>
                            <p id="hour"></p>
                        </div>
                        <div>
                            <p>minute</p>
                            <p id="minute"></p>
                        </div>
                    </div>
                    <div>
                        <p>secundus</p>
                        <p id="second"></p>
                    </div>
                </div>
            </foreignObject>
        </svg>
        ${this._style}
        `;
        return template;
    }

    get _dateTimeParts(){
        return ['year', 'month', 'day', 'hour', 'minute', 'second'];
    }

    connectedCallback() {
        this._updateClock();
    }
}
