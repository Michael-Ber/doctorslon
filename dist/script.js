/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./src/assets/js/main.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
window.addEventListener('DOMContentLoaded', () => {
  (async function () {
    const resp = await fetch('./towns.json');
    const respJSON = await resp.json();
    const listSearchWrapper = document.querySelector('.list-search-wrapper');
    const listSearch = document.querySelector('.list-search');
    const search = document.querySelector('#search');

    //Сортировка маасива объектов по первой букве
    respJSON.features.sort((a, b) => a.name[0].toLowerCase() > b.name[0].toLowerCase() ? 1 : -1).forEach(item => {
      listSearch.innerHTML += `
            <li>
                ${item.properties.hintContent}
            </li>
        `;
    });
    //открытие и закрытие списка под инпутом
    function openCloseListTowns() {
      search.addEventListener('focus', () => {
        listSearchWrapper.style.display = 'block';
      });
      window.addEventListener('click', e => {
        console.log(e.target);
        if (!e.target.classList.contains('list-search') && e.target.id !== 'search' && e.target.tagName !== 'LI') {
          listSearchWrapper.style.display = 'none';
        }
      });
    }
    openCloseListTowns();

    //фильтрация элементов при вводе в инпут
    search.addEventListener('input', e => {
      listSearch.innerHTML = '';
      if (e.target.value === '') {
        respJSON.features.forEach(item => {
          listSearch.innerHTML += `
                    <li class="test">${item.properties.hintContent}</li>
                `;
        });
      }
      respJSON.features.filter(item => {
        for (let i = 0; i < e.target.value.length; i++) {
          if (item.name.toLowerCase().includes(e.target.value) && item.name.indexOf(e.target.value) <= e.target.value.length) {
            return item;
          } else {
            return null;
          }
        }
      }).forEach(elemLi => {
        listSearch.innerHTML += `
                    <li class="test">${elemLi.properties.hintContent}</li>
                `;
      });
    });

    //создание yandex карты

    async function init() {
      let map = new ymaps.Map('map', {
          center: [55.6233267145899, 38.86243310321032],
          zoom: 10
          // controls: ['searchControl']
        }),
        objectManager = new ymaps.ObjectManager({
          clusterize: true,
          gridSize: 32,
          clusterDisableClickZoom: true
        });
      objectManager.objects.options.set('preset', 'islands#blueDotIcon');
      map.geoObjects.add(objectManager);
      objectManager.add(respJSON.features);
      map.controls.remove('geolocationControl');
      map.controls.remove(['searchControl']);
      map.controls.remove('trafficControl');
      map.controls.remove('typeSelector');
      map.controls.remove('fullscreenControl');
      map.controls.remove('zoomControl');
      map.controls.remove('rulerControl');
      map.controls.remove(['scrollZoom']);
    }
    ymaps.ready(init);
  })();
});
/******/ })()
;
//# sourceMappingURL=script.js.map