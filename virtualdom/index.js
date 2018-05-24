// let el = require('./ele');
let el = function (tagName, attrs, children){
        return new Element(tagName, attrs, children);
    }

let vdom = el('ul', {id: 'ul1'}, [
    el('li', {id: 'li1'}, ['li1']), el('li', {id: 'li2'}, ['li2'])
]);

document.body.appendChild(vdom.render());
