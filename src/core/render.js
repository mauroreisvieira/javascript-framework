function render(vnode) {
    if (typeof vnode==='string') {
        let json = JSON.stringify(vnode, null, '  ');
        return document.createTextNode(vnode);
    }


    let n = document.createElement(vnode.nodeName);
    Object.keys(vnode.attributes || {}).forEach( k => n.setAttribute(k, vnode.attributes[k]) );
    (vnode.children || []).forEach( c => n.appendChild(render(c)) );
    return n;
}

export { render };
