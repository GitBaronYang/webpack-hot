import Point from './es6/Point.js';
import el from './es6/element.js';
import diff from './es6/diff.js';
import patch from './es6/patch.js';
import OneWay from './binding/oneway'
// var zr = zrender.init(document.getElementById('myCanvas'));
// var circle = new zrender.Circle({
//     shape: {
//         cx: 150,
//         cy: 50,
//         r: 40
//     },
//     style: {
//         fill: 'none',
//         stroke: '#F00'
//     }
// });
// zr.add(circle);

// var body = document.querySelector('#app');
// body.textContent = 'Good point: ' + new Point(1, 88);

let template = document.querySelector('#app').innerHTML

let oneway = new OneWay({
  template: template,
  el: '#app',
  data: {
    name: 'oneway',
    lang: 'javascript',
    work: 'data binding',
    supports: ['String', 'Array', 'Object'],
    info: {
      author: 'Jrain',
      jsVersion: 'Ecma2015'
    },
    motto: 'hello world'
  }
})

document.querySelector('#oneway-test').oninput = (e) => {
    oneway.$setData(oneway.$data, ($d) => {
      $d.motto = e.target.value
    })
  }


//vnode
var tree = el('div', {'id': 'container'}, [
    el('h1', {style: 'color: blue'}, ['simple virtal dom']),
    el('p', ['Hello, virtual-dom']),
    el('ul', [el('li')])
])
  
var ulRoot = tree.render()
console.log(ulRoot)
document.body.appendChild(ulRoot)

var newTree = el('div', {'id': 'container'}, [
    el('h1', {style: 'color: red'}, ['simple virtal dom']),
    el('p', ['Hello, virtual-dom']),
    el('ul', [el('li'), el('li')])
])

// 4. 比较两棵虚拟DOM树的不同
var patches = diff(tree, newTree)

// 5. 在真正的DOM元素上应用变更
patch(ulRoot, patches)