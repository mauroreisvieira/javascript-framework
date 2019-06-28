import { Component } from '../../src/core/index.js';

export default class Todo extends Component {
    constructor(args) {
        super({
            name: 'todo-list',
            props: ['color', 'fontSize'],
            data: {
                userName: 'Mauro Reis Vieira',
                items: () => [1, 2, 3, 4, 5, 6].map( item =>
                    `<li id="${ item }">Item ${item} </li>`
                ),
            },
            css: () => `
                ul {
                    display: inline-block;
                    border: 2px solid red;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    width: 100%;
                }

                li {
                    color: red;
                }`,
            ready: () => {
                console.log('Ready');
            }
        });
    }

    render (data) {
        const { userName, items } =  data;
        return `
            <main">
                <h2>${userName}</h2>
                <ul>${ items }</ul>
            </main>`;
    }

    watch(el) {
        this.color = el.getAttribute('color');
        this.fontSize = el.getAttribute('fontSize');

        el.style.setProperty('color', this.color);
        el.style.setProperty('font-size', this.fontSize + 'px');
    }
}

new Todo();
