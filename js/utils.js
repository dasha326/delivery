'use strict';
(function(){
    const ESC_KEYCODE = `Escape`;
    const ENTER_KEYCODE = `Enter`;

    window.util = {
        activeClassHandlerByDataset(element, btnId, elId, classNameActive, classNameHide) {
            if(elId === btnId) {
                element.classList.add(classNameActive);
                if (classNameHide) {
                    element.classList.remove(classNameHide);
                }
            } else {
                element.classList.remove(classNameActive);
                if (classNameHide) {
                    element.classList.add(classNameHide);
                }
            }
        },
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