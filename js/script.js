'use strict';
(function(){
    const tabs = document.querySelectorAll('[name="tab"]');
    const contents = document.querySelectorAll('[data-category]');


    tabs.forEach(function(element) {
        element.addEventListener('click', function () {
            const thisId = this.id;
            contents.forEach(function(element) {
                if(element.dataset.category === thisId) {
                    element.classList.add('-active');
                } else {
                    element.classList.remove('-active');
                }
            })
        });
    })
})();