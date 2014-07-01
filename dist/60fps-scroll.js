(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var utils = require('./utils'),
    support = utils.support,
    dispatchClick = utils.dispatchClick;

// ES6
// import { support, dispatchClick } from './utils';

(function() {
    'use strict';

    if (!support)
        return;

    var cover = document.createElement('div'),
        body = document.body,
        coverStyle = cover.style,
        scrollStarted = false,
        raf,
        clicked = false,
        scrollUpdate,
        pos = {
            x: 0,
            y: 0
        };

    coverStyle.cssText = [
        '-webkit-transform: translate3d(0,0,0);',
        'transform: translate3d(0,0,0);',
        'position: fixed;',
        'top: 0;',
        'right: 0;',
        'left: 0;',
        'bottom: 0;',
        'opacity: 0;',
        'z-index: 9;',
        'pointer-events: none'
    ].join('');

    body.appendChild(cover);

    scrollUpdate = function() {
        coverStyle.pointerEvents = 'none';
        scrollStarted = false;
        if (clicked) {
            dispatchClick(pos);
            clicked = false;
        }
    };

    window.addEventListener('scroll', function scroll() {
        if (!scrollStarted) {
            coverStyle.pointerEvents = 'auto';
            scrollStarted = true;
        }
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(scrollUpdate);
    }, false);

    // capture all clicks and store x, y coords for later
    document.addEventListener('click', function clickCatcher(event) {
        if (event.target === cover && !event.synthetic) {
            pos.x = event.clientX;
            pos.y = event.clientY;
            clicked = true;
        }
    }, false);
}());

},{"./utils":2}],2:[function(require,module,exports){
var support = (function support() {
    var element = document.createElement('x');
    element.style.cssText = 'pointer-events:auto';
    return element.style.pointerEvents === 'auto';
}());

function dispatchClick(coords) {
    var event = document.createEvent('MouseEvent'),
        elem = document.elementFromPoint(coords.x, coords.y);

    event.initMouseEvent(
        'click',
        true, /* bubble */
        true, /* cancelable */
        window,
        null,
        coords.x, coords.y, 0, 0, /* coordinates */
        false, false, false, false, /* modifier keys */
        0, /*left*/
        null
    );
    event.synthetic = true;

    elem.dispatchEvent(event);
}

// ES6
// export { support, dispatchClick };

exports.support = support;
exports.dispatchClick = dispatchClick;

},{}]},{},[1])