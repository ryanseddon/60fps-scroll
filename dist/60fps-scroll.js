(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var support = require("./utils").support;
var dispatchClick = require("./utils").dispatchClick;

var cover = document.createElement('div'),
    body = document.body,
    coverStyle = cover.style,
    scrollStarted = false,
    timer,
    clicked = false,
    pos = { x: 0, y: 0 };

if(support) {
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

    window.addEventListener('scroll', function() {
        if(!scrollStarted) {
            coverStyle.pointerEvents = 'auto';
            scrollStarted = true;
        }
        clearTimeout(timer);

        timer = setTimeout(function(){
            coverStyle.pointerEvents = 'none';
            scrollStarted = false;
            if(clicked) {
                dispatchClick(pos);
                clicked = false;
            }
        },500);
    }, false);

    // capture all clicks and store x, y coords for later
    document.addEventListener('click', function(event) {
        if(event.target === cover && !event.synthetic) {
            pos.x = event.clientX;
            pos.y = event.clientY;
            clicked = true;
        }
    }, false);
}
},{"./utils":2}],2:[function(require,module,exports){
"use strict";
var support = (function support() {
    var element = document.createElement('x');
    element.style.cssText = 'pointer-events:auto';
    return element.style.pointerEvents === 'auto';
}());

function dispatchClick(coords){
    var event = document.createEvent('MouseEvent'),
        elem = document.elementFromPoint(coords.x, coords.y);

    event.initMouseEvent(
        'click',
        true /* bubble */, true /* cancelable */,
        window, null,
        coords.x, coords.y, 0, 0, /* coordinates */
        false, false, false, false, /* modifier keys */
        0 /*left*/, null
    );
    event.synthetic = true;

    elem.dispatchEvent(event);
}

exports.support = support;
exports.dispatchClick = dispatchClick;
},{}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvUnlhbi9Ecm9wYm94L0Rldi9HaXQvNjBmcHMtc2Nyb2xsL2Rpc3QvZmFrZV9kYWY2MWJlMS5qcyIsIi9Vc2Vycy9SeWFuL0Ryb3Bib3gvRGV2L0dpdC82MGZwcy1zY3JvbGwvZGlzdC91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIHN1cHBvcnQgPSByZXF1aXJlKFwiLi91dGlsc1wiKS5zdXBwb3J0O1xudmFyIGRpc3BhdGNoQ2xpY2sgPSByZXF1aXJlKFwiLi91dGlsc1wiKS5kaXNwYXRjaENsaWNrO1xuXG52YXIgY292ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICBib2R5ID0gZG9jdW1lbnQuYm9keSxcbiAgICBjb3ZlclN0eWxlID0gY292ZXIuc3R5bGUsXG4gICAgc2Nyb2xsU3RhcnRlZCA9IGZhbHNlLFxuICAgIHRpbWVyLFxuICAgIGNsaWNrZWQgPSBmYWxzZSxcbiAgICBwb3MgPSB7IHg6IDAsIHk6IDAgfTtcblxuaWYoc3VwcG9ydCkge1xuICAgIGNvdmVyU3R5bGUuY3NzVGV4dCA9IFtcbiAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLDAsMCk7JyxcbiAgICAgICAgJ3RyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwwLDApOycsXG4gICAgICAgICdwb3NpdGlvbjogZml4ZWQ7JyxcbiAgICAgICAgJ3RvcDogMDsnLFxuICAgICAgICAncmlnaHQ6IDA7JyxcbiAgICAgICAgJ2xlZnQ6IDA7JyxcbiAgICAgICAgJ2JvdHRvbTogMDsnLFxuICAgICAgICAnb3BhY2l0eTogMDsnLFxuICAgICAgICAnei1pbmRleDogOTsnLFxuICAgICAgICAncG9pbnRlci1ldmVudHM6IG5vbmUnXG4gICAgXS5qb2luKCcnKTtcbiAgICBib2R5LmFwcGVuZENoaWxkKGNvdmVyKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoIXNjcm9sbFN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIGNvdmVyU3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgICAgICAgICAgIHNjcm9sbFN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG5cbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjb3ZlclN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgICAgICAgICBzY3JvbGxTdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICBpZihjbGlja2VkKSB7XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2hDbGljayhwb3MpO1xuICAgICAgICAgICAgICAgIGNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSw1MDApO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIC8vIGNhcHR1cmUgYWxsIGNsaWNrcyBhbmQgc3RvcmUgeCwgeSBjb29yZHMgZm9yIGxhdGVyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZihldmVudC50YXJnZXQgPT09IGNvdmVyICYmICFldmVudC5zeW50aGV0aWMpIHtcbiAgICAgICAgICAgIHBvcy54ID0gZXZlbnQuY2xpZW50WDtcbiAgICAgICAgICAgIHBvcy55ID0gZXZlbnQuY2xpZW50WTtcbiAgICAgICAgICAgIGNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSwgZmFsc2UpO1xufSIsIlwidXNlIHN0cmljdFwiO1xudmFyIHN1cHBvcnQgPSAoZnVuY3Rpb24gc3VwcG9ydCgpIHtcbiAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3gnKTtcbiAgICBlbGVtZW50LnN0eWxlLmNzc1RleHQgPSAncG9pbnRlci1ldmVudHM6YXV0byc7XG4gICAgcmV0dXJuIGVsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9PT0gJ2F1dG8nO1xufSgpKTtcblxuZnVuY3Rpb24gZGlzcGF0Y2hDbGljayhjb29yZHMpe1xuICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50JyksXG4gICAgICAgIGVsZW0gPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGNvb3Jkcy54LCBjb29yZHMueSk7XG5cbiAgICBldmVudC5pbml0TW91c2VFdmVudChcbiAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgdHJ1ZSAvKiBidWJibGUgKi8sIHRydWUgLyogY2FuY2VsYWJsZSAqLyxcbiAgICAgICAgd2luZG93LCBudWxsLFxuICAgICAgICBjb29yZHMueCwgY29vcmRzLnksIDAsIDAsIC8qIGNvb3JkaW5hdGVzICovXG4gICAgICAgIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAvKiBtb2RpZmllciBrZXlzICovXG4gICAgICAgIDAgLypsZWZ0Ki8sIG51bGxcbiAgICApO1xuICAgIGV2ZW50LnN5bnRoZXRpYyA9IHRydWU7XG5cbiAgICBlbGVtLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufVxuXG5leHBvcnRzLnN1cHBvcnQgPSBzdXBwb3J0O1xuZXhwb3J0cy5kaXNwYXRjaENsaWNrID0gZGlzcGF0Y2hDbGljazsiXX0=
