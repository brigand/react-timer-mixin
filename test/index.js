var timerMixin = require('../dist/react-timer-mixin');
var test = require('tape');
var reactMixin = require('react-mixin');

function C(){
    var proto = {render: function(){}};
    reactMixin(proto, timerMixin);
    return Object.create(proto);
}

test('timer', function(t){
    t.plan(1);

    var c = C();
    c.timerCallback = function(){
        t.ok(true);
        c.timerStop();
    };

    c.componentWillMount();
    c.timerStart();
});
