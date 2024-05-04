
const { createSetTimeout } = require('./23. setTimeout.js');

function createInterval() {
	let intervalId = 1;
	let intervalMap = {}; // to check whether the id is cleared or not

	var { setTimeoutPolyfill, clearTimeoutPoly } = createSetTimeout();

	function setIntervalPolyfill(callback, delay) {
		let id = intervalId++;
		function reiterate() {
			intervalMap[id] = setTimeoutPolyfill(function () {
				callback();
				if (intervalMap[id]) {
					reiterate();
				}
			}, delay);
		}
        reiterate()
        return id
	}

    function clearIntervalPolyfill(id){
        clearTimeoutPoly(id)
        delete intervalMap[id]
    }
    return { setIntervalPolyfill, clearIntervalPolyfill }
}


let { setIntervalPolyfill, clearIntervalPolyfill } = createInterval()


setIntervalPolyfill(function() {
    console.log("Hey! Vikrant You are the Univerese!")
}, 4000)