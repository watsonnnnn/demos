function diff(oldTree, newTree) {
  let patches = {};

  let index = 0;

  console.log(oldTree);
  walk(oldTree, newTree, index, patches);

  return patches;
}

function diffAttr(oldAttrs, newAttrs) {
  let patch = {};
  for (let key in oldAttrs) {
      if (oldAttrs[key] !== newAttrs[key]) {
          patch[key] = newAttrs[key]; 
      }
  }

  for (let key in newAttrs) {
      if (!oldAttrs.hasOwnProperty(key)) {
          patch[key] = newAttrs[key];
      }
  }
  return patch;
}

function diffChildren(oldChildren, newChildren, patches) {
  oldChildren.forEach((child, index) => {
      walk(child, newChildren[index], ++num, patches);
  });
}

function isString(node) {
  return Object.prototype.toString.call(node) === '[object String]';
}

const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';

let num = 0;


function walk(oldNode, newNode, index, patches) {
  let current = [];

  if (!newNode) {
      current.push({ type: REMOVE, node: oldNode });
  } else if (isString(oldNode) && isString(newNode)) {
      if (oldNode !== newNode) {
          current.push({ type: TEXT, text: newNode });
      }
  } else if (oldNode.type === newNode.type) {
      let attrs = diffAttr(oldNode.props, newNode.props);
      if (Object.keys(attrs).length > 0) {
          current.push({ type: ATTRS, attrs });
      }
      if(newNode.children){
        diffChildren(oldNode.children, newNode.children, patches);
      }else{
          current.push({
              type: REMOVE, node: oldNode.children
          })
      }
  } else {
      current.push({ type: REPLACE, newNode});
  }
  if (!oldNode) {
      current.push({type: REPLACE, newNode});
  }
  
  if (current.length) {
      patches[index] = current;
  }

}

// export default diff;