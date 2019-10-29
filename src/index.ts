import _ from 'lodash';
import printMe from './prints.js';

function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'Webpack'], '');

    btn.innerHTML = 'Click me and check the console';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
}

document.body.appendChild(component());

// @ts-ignore
if (module.hot) {
    // @ts-ignore
    module.hot.accept('./prints.js', function () {
        console.log('Accepting the updated printMe module!');
        printMe()
    })
}
