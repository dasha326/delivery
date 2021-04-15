'use strict';
(function(){
    const ESC_KEYCODE = `Escape`;
    const ENTER_KEYCODE = `Enter`;

    window.util = {
        isEscEvent(e, action, param) {
            if (e.key === ESC_KEYCODE) {
                action(param);
            }
        },
        isEnterEvent(e, action, element) {
            if (e.key === ENTER_KEYCODE) {
                action(element);
            }
        }
    }
})();