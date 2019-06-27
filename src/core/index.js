// import { render } from './render.js';
// import { createElement } from './create-element.js';

class Component {
    constructor(args) {

        const { name, data, props, css } = args;

        this.name = name;
        this.data_ = data;

        let tmpl = document.createElement('template');

        tmpl.innerHTML = `
            <style>${css.call(this)}</style>
            ${this.render(this.data)}
        `;

        const self = this;

        customElements.define(this.name, class extends HTMLElement {
            static get observedAttributes() {
                return [props];
            }

            constructor() {
                super();
                this.root = this.attachShadow({mode: 'open'});
                this.root.appendChild(tmpl.content.cloneNode(true));
                this.connectedCallback();
            }

            /** Custom myElemet element added to page. */
            connectedCallback() {
                self.connected();
            }

            /** Custom myElemet element removed from page. */
            disconnectedCallback() {
                self.disconnected();
            }

            /** Custom myElemet element moved to new page. */
            adoptedCallback() {
                self.updated();
            }

            /** Custom myElemet element attributes changed */
            attributeChangedCallback(name, oldValue, newValue) {
                console.log(name);
                self.watch(name, oldValue, newValue);
            }
        });
    }

    get data() {
        for (let [key, value] of Object.entries(this.data_)) {
            if (typeof value === 'function') {
                this.data_[key] = value.call().join('');
            }
        }
        return this.data_;
    }

    connected() {}

    disconnected() {}

    watch() {}

    render() {}

}

export { Component };
