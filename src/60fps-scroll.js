(function(window, document) {
    var cover = document.createElement('div'),
        body = document.body,
        coverStyle = cover.style,
        scrollStarted = false,
        timer,
        clicked = false,
        pos = { x: 0, y: 0 };

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
                console.log('dispatching click event');
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


    function dispatchClick(coords){
        var event = document.createEvent("MouseEvent"),
            elem = document.elementFromPoint(coords.x, coords.y);

        event.initMouseEvent(
            "click",
            true /* bubble */, true /* cancelable */,
            window, null,
            coords.x, coords.y, 0, 0, /* coordinates */
            false, false, false, false, /* modifier keys */
            0 /*left*/, null
        );
        event.synthetic = true;

        elem.dispatchEvent(event);
    }
}(this, document));