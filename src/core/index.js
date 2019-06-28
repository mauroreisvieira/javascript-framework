class Component {
    constructor(args) {

        const { name, data, props, css } = args;

        this.name_ = name;
        this.data_ = data;

        let tmpl = document.createElement('template');

        tmpl.innerHTML = `
            <style>${css.call(this)}</style>
            ${this.render(this.data)}
        `;

        const self = this;

        customElements.define(this.name_, class extends HTMLElement {
            static get observedAttributes() {
                return [props];
            }

            constructor() {
                super();
                this.root = this.attachShadow({mode: 'open'});
                this.root.appendChild(tmpl.content.cloneNode(true));
            }

            /** Custom myElemet element added to page. */
            connectedCallback() {
                console.log('connectedCallback');
                self.watch(this);
            }

            /** Custom myElemet element removed from page. */
            disconnectedCallback() {
                console.log('disconnectedCallback');
            }

            /** Custom myElemet element moved to new page. */
            adoptedCallback() {
                console.log('adoptedCallback');
                self.updated();
            }

            /** Custom myElemet element attributes changed */
            attributeChangedCallback(name, oldValue, newValue) {
                console.log('attributeChangedCallback');
                console.log(name);
                self.watch(this);
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

    watch(el) {}

    render() {
        console.log('render');
    }

}

export { Component };
