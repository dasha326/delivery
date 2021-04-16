'use strict';
// Form
(function () {
    const form = document.querySelector('.tabs-block__form');
    const phone = document.querySelector('.phone');
    const submitBtn = form.querySelector('.form__submit-btn');
    const requiredInputs = form.querySelectorAll('input[required]');
    const creditCardPart = form.querySelectorAll('[name="credit-card-part"]');
    const creditCardFull = form.querySelector('[name="credit-card"]');

    const luhnAlgorithm = function(value) {
        value = value.replace(/\D/g, '');
        let nCheck = 0;
        let bEven = false;
        for (var n = value.length - 1; n >= 0; n--) {
            var nDigit = parseInt(value.charAt(n), 10);

            if (bEven && (nDigit *= 2) > 9) {
                nDigit -= 9;
            }

            nCheck += nDigit;
            bEven = !bEven;
        }
        return (nCheck % 10) == 0;
    };

    // Credit Card Handler
    creditCardPart.forEach(function(element, index, array) {
        const maxValue = parseInt(element.getAttribute('maxlength'));
        const prevSibling = element.previousElementSibling.previousElementSibling;
        const prevSiblingExist = prevSibling.classList.contains('credit-card-part');
        const nextSibling = element.nextElementSibling.nextElementSibling;
        const nextSiblingExist = nextSibling.classList.contains('credit-card-part');

        let constraints = {
            address: {
                presence: true,
            },
            "date-delivery": {
                presence: true,
            },
            "credit-card": {
                presence: true,
                length: {
                    minimum: 4
                },
            },
            phone: {
                presence: true,
                pattern: "[0-9]+"
            },
            username: {
                // You need to pick a username too
                presence: true,
                // And it must be between 3 and 20 characters long
                length: {
                    minimum: 3,
                    maximum: 20
                },
                format: {
                    // We don't allow anything that a-z and 0-9
                    pattern: "[a-z0-9]+",
                    // but we don't care if the username is uppercase or lowercase
                    flags: "i",
                    message: "can only contain a-z and 0-9"
                }
            },
            "number-of-children": {
                presence: true,
                // Number of children has to be an integer >= 0
                numericality: {
                    onlyInteger: true,
                    greaterThanOrEqualTo: 0
                }
            }
        };
        element.addEventListener('keydown', function(e) {
            let valueLength = element.value.length;
            if(e.key === 'Backspace' && valueLength === 0 && prevSiblingExist) {
                prevSibling.focus();
            }
        });
        element.addEventListener('input', function() {
            let valueHidden = '';
            let valueLength = element.value.length;
            if(valueLength === maxValue && nextSiblingExist) {
                nextSibling.focus();
            }
            if(!nextSiblingExist) {

            }
            array.forEach(function(element) {
                valueHidden += element.value;
                console.log(valueHidden);
            });
            creditCardFull.value = valueHidden;
        })
    })

    // const addInvalidStyle = function (element) {
    //     console.log(3333);
    //     element.addEventListener(`invalid`, function () {
    //         console.log(111);
    //         console.log(element.validity.valid);
    //         if (element.validity.valid === false) {
    //             const parent = element.parentNode;
    //             console.log(parent);
    //             parent.classList.add(`input-wrapper--error`);
    //         }
    //     });
    // };
    //
    //
    // requiredInputs.forEach(function (element) {
    //     addInvalidStyle(element);
    // });
    //
    // form.addEventListener('submit', function(e){
    //     e.preventDefault();
    //     validate(phone, constraints);
    // });
    //



    // Hook up the form so we can prevent it from being posted
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        handleFormSubmit(form);
    });

    // Hook up the inputs to validate on the fly
    var inputs = document.querySelectorAll("input, textarea, select")
    for (var i = 0; i < inputs.length; ++i) {
        inputs.item(i).addEventListener("change", function(ev) {
            var errors = validate(form, constraints) || {};
            showErrorsForInput(this, errors[this.name])
        });
    }

    function handleFormSubmit(form, input) {
        // validate the form against the constraints
        var errors = validate(form, constraints);
        // then we update the form to reflect the results
        showErrors(form, errors || {});
        if (!errors) {
            showSuccess();
        }
    }

    // Updates the inputs with the validation errors
    function showErrors(form, errors) {
        // We loop through all the inputs and show the errors for that input
        _.each(form.querySelectorAll("input[name], select[name]"), function(input) {
            // Since the errors can be null if no errors were found we need to handle
            // that
            showErrorsForInput(input, errors && errors[input.name]);
        });
    }

    // Shows the errors for a specific input
    function showErrorsForInput(input, errors) {
        // This is the root of the input
        var formGroup = closestParent(input.parentNode, "form-group")
            // Find where the error messages will be insert into
            , messages = formGroup.querySelector(".messages");
        // First we remove any old messages and resets the classes
        resetFormGroup(formGroup);
        // If we have errors
        if (errors) {
            // we first mark the group has having errors
            formGroup.classList.add("has-error");
            // then we append all the errors
            _.each(errors, function(error) {
                addError(messages, error);
            });
        } else {
            // otherwise we simply mark it as success
            formGroup.classList.add("has-success");
        }
    }

    // Recusively finds the closest parent that has the specified class
    function closestParent(child, className) {
        if (!child || child == document) {
            return null;
        }
        if (child.classList.contains(className)) {
            return child;
        } else {
            return closestParent(child.parentNode, className);
        }
    }

    function resetFormGroup(formGroup) {
        // Remove the success and error classes
        formGroup.classList.remove("has-error");
        formGroup.classList.remove("has-success");
        // and remove any old messages
        _.each(formGroup.querySelectorAll(".help-block.error"), function(el) {
            el.parentNode.removeChild(el);
        });
    }

    // Adds the specified error with the following markup
    // <p class="help-block error">[message]</p>
    function addError(messages, error) {
        var block = document.createElement("p");
        block.classList.add("help-block");
        block.classList.add("error");
        block.innerText = error;
        messages.appendChild(block);
    }

    function showSuccess() {
        // We made it \:D/
        alert("Success!");
    }
})();
