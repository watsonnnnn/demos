function Element(tagName, attrs, children){
    this.tagName = tagName;
    this.attrs = attrs;
    this.children = children;
}

Element.prototype.render = function(){
    var cle = document.createElement(this.tagName);
    var props = this.attrs;

    for(var name in props){
        if({}.hasOwnProperty.call(props, name)) this.setAttr.call(cle, name, props[name]);
    }

    this.children && this.children[0] && this.children.forEach(child => {
        var cls = child instanceof Element?child.render():document.createTextNode(child);
        cle.appendChild(cls);
    });

    return cle;

}

Element.prototype.setAttr = function(name, value){
    if(typeof this != 'object') return;
    this.setAttribute(name, value);
}


// module.exports = function (tagName, attrs, children){
//     return new Element(tagName, attrs, children);
// }