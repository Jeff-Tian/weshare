function trimString(s, substr) {
    return s.replace(substr, '');
}

function prependString(s, substr) {
    return substr + s;
}

function trimNode(n, substr) {
    return traverseObject(n, function (node) {
        return trimString(node, substr);
    });
}

function prependNode(n, substr) {
    return traverseObject(n, function (node) {
        return prependString(node, substr);
    });
}

function traverseObject(n, action) {
    var anotherNode = {};

    for (var p in n) {
        if (typeof n[p] === 'string') {
            anotherNode[p] = action(n[p]);
        } else {
            anotherNode[p] = traverseObject(n[p], action);
        }
    }

    return anotherNode;
}

function prepend(tree, substr) {
    return prependNode(tree, substr);
}

var ret = {
    trim: trimNode,
    prepend: prependNode
};

if (module && module.exports) {
    module.exports = ret;
} else if (angular) {
    angular.module('ng.utils', [])
        .factory('leavesTrimmer', [function () {
            return ret;
        }])
    ;
}