### description

- Starting the timer: `this.timerStart()`
- Stopping the timer: `this.timerStop()`

---

### defaults

    TIMEOUT = 5; // seconds

---


### usage

```
var React = require('react');
var TimerMixin = require('react-timer-mixin');

var SomeComponent = React.createClass({

    mixins: [TimerMixin],

    // propTypes, getInitialState, etc.


    /*
        Initializing the Timer
     */
    _someFunc: function () {
        this.timerStart();
    },


    /**
     * timerCallback - Not required, but available to all Components
     * utilizing react-timer-mixin.
     */
    timerCallback: function () {
        var url = 'www.example.com/rest/api/url';

        var promise = $.ajax({
            url  : url,
            type : 'get'
        }).done(function (response, textStatus) {
            if (textStatus == 'success') {
                /*
                 * Do stuff with the response here:
                 * - Dispatch it via Flux
                 * - Update the Component State
                 * - Conquer the World
                 * - etc.
                 */

                this.setState({
                    cbResponse: response.apiData
                });
            }
        });
    },

    render: function () {
        return (
            <div>{this.state.cbResponse.propertyName}</div>
        );
    }

});

module.exports = SomeComponent;
```

---

### notes

if you need to changed the interval at which the `timerCallback` function is called, then change `TIMEOUT` in the `timer-mixin.js` file.
