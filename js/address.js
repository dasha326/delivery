'use strict';
const newCityGroupWrapper = document.querySelector('.cities-group-wrapper');
const newAddressGroupWrapper = document.querySelector('.address-group-wrapper');

// Cities
(function () {
    const cityTemplate = document.querySelector('#cities-group').content;
    window.createCity = function (city, cityId, place) {
        const cityInput = cityTemplate.querySelector('input').cloneNode(true);
        cityInput.id = `city-${cityId}`;
        cityInput.value = city;
        cityInput.checked = place === 0;

        const cityLabel = cityTemplate.querySelector('label').cloneNode(true);
        cityLabel.htmlFor = `city-${cityId}`;
        cityLabel.textContent = city;

        cityInput.addEventListener('change', function(){
           const thisId = this.id;
           console.log(567);
           window.changeAddress(thisId);
        });
        newCityGroupWrapper.appendChild(cityInput);
        newCityGroupWrapper.appendChild(cityLabel);
    };
})();

// Address
(function() {
    const addressTemplate = document.querySelector('#address-group').content;
    window.createAddress = function (cord, address, cityId, addressId, lastAddressId, place) {
        const newAddressGroup = addressTemplate.querySelector('.address-group').cloneNode(true);
        newAddressGroup.dataset.city = `city-${cityId}`;
        newAddressGroup.classList.add(place === 0 ? '-visible': '-hide');
        if (addressId === 0) {
            newAddressGroup.classList.add('-first');
        }
        if (addressId === lastAddressId - 1) {
            newAddressGroup.classList.add('-last');
        }

        const addressInput = newAddressGroup.querySelector('input');
        addressInput.id = `city-${cityId}-address-${addressId}`;
        addressInput.name = `city-${cityId}-address`;
        addressInput.value = address;

        const addressLabel = newAddressGroup.querySelector('label');
        addressLabel.htmlFor = `city-${cityId}-address-${addressId}`;
        addressLabel.textContent = address;

        newAddressGroup.appendChild(addressInput);
        newAddressGroup.appendChild(addressLabel);
        newAddressGroupWrapper.appendChild(newAddressGroup);
    };
})();

(function() {
    window.changeAddress = function(btnId){
        console.log(123);
        const elements = document.querySelectorAll('[data-city]');
        elements.forEach(function(element) {
            const elementId = element.dataset.city;
            window.util.activeClassHandlerByDataset(element, btnId, elementId, '-visible', '-hiden');
        })
    }
})();