'use strict';
(function(){
    const tabs = document.querySelectorAll('[name="tab"]');
    const contents = document.querySelectorAll('[data-category]');

    tabs.forEach(function(element) {
        element.addEventListener('click', function() {
            const thisId = this.id;
            contents.forEach(function(element) {
                window.util.activeClassHandlerByDataset(element, thisId, element.dataset.category, '-active');
            })
        });
    });

    window.dataHandler = function (data) {
        for (let i = 0; i < data.cities.length; i++) {
            const cities = data.cities;
            const citiesId =  cities[i]['id'];
            window.createCity(cities[i]['city'], citiesId, i);
            for (let x = 0; x < cities[i]['delivery-points'].length; x++) {
                const address = cities[i]['delivery-points'];
                window.createAddress(address[x]['coordinates'], address[x]['address'], citiesId, x, cities[i]['delivery-points'].length, i);
            }
            // if (Object.keys(cities[i][`delivery-points`]).length > 0) {
            //     console.log(cities[i][`delivery-points`]);
            //     console.log(cities[i]['coordinates'], cities[i]['city'], cities[i]['delivery-points']);
            //     // window.createPin(data[i][`location`][`x`], data[i][`location`][`y`], data[i][`author`][`avatar`], data[i][`offer`][`title`], i, pinsFragment);
            //
            // }
        }
        //window.mapPinsContainer.append(addressFragment);
        // window.mapFilter.before(cardsFragment);
        // window.elementsData = data;
        // window.updateElements(window.elementsData);
    };
    window.backend.loadData(window.dataHandler, window.backend.errorMessage);
})();