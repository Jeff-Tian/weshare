(function ($) {
    function debugView($debugView, o) {
        if (!$debugView) {
            return;
        }

        var now = new Date();
        var nowStr = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();

        $debugView.append(nowStr + ' >> ');

        var theType = typeof o;

        if (o === null) {
            $debugView.append('null');
        } else if (theType === 'undefined') {
            $debugView.append('undefined');
        } else {
            $debugView.append(o.toString());
        }

        if (theType !== 'string' && theType !== 'number') {
            $debugView.append(serialize(o));
        }

        $debugView.append('\n');
    }

    window.console2 = {};
    console2.log = window.console.log;
    console2.error = window.console.error;

    window.console.log = function (o) {
        console2.log.call(console, o);
        console2.log('$ = ' + $);
        if (!$) {
            return;
        }
        debugView($('#debug-view-log'), o);
    };

    window.console.error = function (o) {
        console2.log.call(console, o);
        debugView($('#debug-view-error'), o);
        //throw new Error(o);
    };
})(window['jQuery']); // jshint ignore:line