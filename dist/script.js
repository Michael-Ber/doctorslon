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
    const mapTrigger = document.querySelector('.static-map');
    const overlay = document.querySelector('.overlay');
    const closeMap = document.querySelector('.overlay__close');

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
        if (e.target.classList.contains('overlay_active') || e.target.tagName === 'A') {
          overlay.classList.remove('overlay_active');
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

    //открытие, закрытие popup'a с картой

    mapTrigger.addEventListener('click', () => {
      overlay.classList.add('overlay_active');
    });
    closeMap.addEventListener('click', () => {
      overlay.classList.remove('overlay_active');
    });
  })();
});
/******/ })()
;
//# sourceMappingURL=script.js.map