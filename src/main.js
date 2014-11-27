import { support, dispatchClick } from './utils';

if (typeof document.addEventListener !== 'function') {
    return;
}

document.addEventListener('DOMContentLoaded', function() {
    if(!support) {
        return;
    }

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
        'z-index: 2147483647;',
        'pointer-events: none'
    ].join('');
    body.appendChild(cover);

    window.addEventListener('scroll', function scroll() {
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
    document.addEventListener('click', function clickCatcher(event) {
        if(event.target === cover && !event.synthetic) {
            pos.x = event.clientX;
            pos.y = event.clientY;
            clicked = true;
        }
    }, false);
}, false);
