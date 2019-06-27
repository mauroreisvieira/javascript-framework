import { render } from './render.js';

let items = ['foo', 'bar', 'baz'];

function item(text) {
    return `<li>${text}</li>`;
}
// a simple JSX "view" with a call out ("partial") to generate a list from an Array:
let vdom =
    `<div id="foo">
        <p>Look, a simple JSX DOM renderer!</p>
        <ul>
            ${ items.map(item) }
        </ul>
    </div>`;


// render() converts our "virtual DOM" (see below) to a real DOM tree:
let dom = render(vdom);

// append the new nodes somewhere:
document.body.appendChild(dom);

// Remember that "virtual DOM"? It's just JSON - each "VNode" is an object with 3 properties.
let json = JSON.stringify(vdom, null, '  ');

document.body.appendChild(
    render(`<pre>${ json }</pre>`)
);
