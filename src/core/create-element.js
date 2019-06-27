export class createElement extends HTMLElement {
    constructor() {
        super();
        console.log('sas');
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = ``;
    }

    connectedCallback() {}

    disconnectedCallback() {}
}
