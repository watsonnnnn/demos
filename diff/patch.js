// import { Element, render, setAttr } from './element';

let allPatches;
let index = 0; 
function patch(node, patches) {
    allPatches = patches;
    walkPatch(node);
}

function walkPatch(node) {
    let current = allPatches[index++];
    let childNodes = node.childNodes;

    childNodes.forEach(child => walkPatch(child));

    if (current) {
        doPatch(node, current);
    }
}

function doPatch(node, patches) {
    patches.forEach(patch => {
        switch (patch.type) {
            case 'ATTRS':
                for (let key in patch.attrs) {
                    let value = patch.attrs[key];
                    if (value) {
                        setAttr(node, key, value);
                    } else {
                        node.removeAttribute(key);
                    }
                }
                break;
            case 'TEXT':
                node.textContent = patch.text;
                break;
            case 'REPLACE':
                let newNode = (patch.newNode instanceof Element) ? render(patch.newNode) : document.createTextNode(patch.newNode);
                node.parentNode.replaceChild(newNode, node);
                break;
            case 'REMOVE':
                if(Array.isArray(node)){
                    [...node].forEach(n=>{
                        n.parentNode.removeChild(n);
                    })
                }else{
                    node.parentNode.removeChild(node);
                }
                break;
            default:
                break;
        }
    });
}

// export default patch;