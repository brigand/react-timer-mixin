var TIMEOUT = 5;

var Timer = {
    componentWillMount: function() {
        if (!this.timerCallback)
            console.info("Timer Mixin notice: if defined in your component, 'timerCallback' will run every time the Timer is started or restarted.");
        
        this._react_timer_mixin = {
            status   : 'start',
            timeLeft : null,
            getTimer : null,
            timeout  : TIMEOUT
        };
    },

    timerStart: function (seconds) {
        var timer = this._react_timer_mixin;
        
        timer.status = 'start';
        timer.timeout = seconds || TIMEOUT;
        timer.timeLeft = timer.timeLeft || timer.timeout;
        
        internal.tick.call(this);

        // Only invoke callback if defined
        if (this.timerCallback) this.timerCallback();
    },

    timerStop: function () {
        this._react_timer_mixin.status = 'stop';
        if (this._react_timer_mixin.getTimer) {
            clearTimeout(this._react_timer_mixin.getTimer);
            this._react_timer_mixin.getTimer = null;
        }
    },
    
    componentWillUnmount: function(){
        this.timerStop();
    }
}

var internal = {
    timerRestart: function () {
        var timer = this._react_timer_mixin;
        timer.status = 'start';
        timer.timeLeft = timer.timeout;

        // Only invoke callback if defined
        if (this.timerCallback) this.timerCallback();
    },

    decrementTimeleft: function () {
        this._react_timer_mixin.timeLeft -= 1;
    },

    timerIsRunning: function () {
        return this._react_timer_mixin.getTimer !== null;
    },

    tick: function () {
        var timer = this._react_timer_mixin;
        timer.getTimer = setTimeout(function () {

            if (timer.status === 'stop') {
                timer.getTimer = undefined;
                return;
            }

            if (timer.timeLeft <= 1) {
                internal.timerRestart.call(this);
            } else {
                internal.decrementTimeleft.call(this);
            }

            internal.tick.call(this);
        }.bind(this), Math.min(1, timer.timeLeft) * 1000);
    }
};

module.exports = Timer;
