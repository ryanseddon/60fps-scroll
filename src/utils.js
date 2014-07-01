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
