'use strict';
(function(){
    const SUCCESS = 200;
    const NOT_FOUND = 200;
    window.backend = {
        loadData(onLoad, onError) {
            const url = `https://fake-json-shop-heroku.herokuapp.com/db`;
            const xhr = new XMLHttpRequest();
            xhr.open(`GET`, url);
            xhr.responseType = `json`;

            xhr.addEventListener(`load`, function() {
                let error;
                switch (xhr.status) {
                    case SUCCESS:
                        onLoad(xhr.response);
                        console.log('Все гуд');
                        break;
                    case NOT_FOUND:
                        error = `Файл не найден`;
                        break;
                    default:
                        error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
                }
                if (error) {
                    onError(error);
                }
            });
            xhr.send();
        },
        upload(data, onLoad, onError) {
            const url = `https://fake-json-shop-heroku.herokuapp.com/requests`;
            const xhr = new XMLHttpRequest();
            xhr.open(`POST`, url);
            xhr.send(data);
            xhr.addEventListener(`load`, function () {
                if (xhr.status === SUCCESS) {
                    onLoad();
                } else {
                    onError();
                }
            });
            xhr.addEventListener(`error`, function () {
                onError();
            });
        },
        errorMessage(error) {
            const errorElement = document.createElement(`div`);
            errorElement.style.cssText = `
              position: fixed;
              background-color: #f0f0ea;
              color: #db1818;
              text-align: center;
              z-index: 9;
              width: 100%;
              padding: 10px;
              font-weight: bold;
              Font-size: 18px;`;
            errorElement.textContent = error;
            document.body.prepend(errorElement);
            setTimeout(function () {
                errorElement.remove();
            }, 10000);
        }
    }

})();