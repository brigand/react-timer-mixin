var React = require('react');

var TIMEOUT = 5;

var Timer = {

    propTypes: {
        status   : React.PropTypes.string,
        timeLeft : React.PropTypes.number,
        getTimer : React.PropTypes.object
    },

    getInitialState: function () {
        return {
            status   : 'start',
            timeLeft : TIMEOUT,
            getTimer : undefined
        };
    },

    componentWillMount: function() {
        if (!this.timerCallback)
            console.info("Timer Mixin notice: if defined in your component, 'timerCallback' will run every time the Timer is started or restarted.");
    },

    timerStart: function () {
        this.state.status = 'start';
        this.tick();

        // Only invoke callback if defined
        if (this.timerCallback) this.timerCallback();
    },

    timerStop: function () {
        this.state.status = 'stop';
    },

    timerRestart: function () {
        this.state.status = 'start';
        this.state.timeLeft = TIMEOUT;

        // Only invoke callback if defined
        if (this.timerCallback) this.timerCallback();
    },

    decrementTimeleft: function () {
        this.state.timeLeft -= 1;
    },


    timerIsRunning: function () {
        return (this.state.getTimer === undefined) ? false : true;
    },



    tick: function () {
        this.state.getTimer = setTimeout(function () {

            if (this.state.status === 'stop') {
                this.state.getTimer = undefined;
                return;
            }

            if (this.state.timeLeft <= 1) {
                this.timerRestart();
            } else {
                this.decrementTimeleft();
            }

            this.tick();
        }.bind(this), 1000);
    },

    logTimerMixin: function () {
        console.log(this.state);
    },
};

module.exports = Timer;
