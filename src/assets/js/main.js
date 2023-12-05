




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
        respJSON.features.sort((a, b) => (a.name[0].toLowerCase() > b.name[0].toLowerCase() ? 1 : -1)).forEach(item => {
            listSearch.innerHTML += `
            <li>
                ${item.properties.hintContent}
            </li>
        `;
        })
        //открытие и закрытие списка под инпутом
        function openCloseListTowns() {
            search.addEventListener('focus', () => {
                listSearchWrapper.style.display = 'block';
            })

            window.addEventListener('click', (e) => {
                if (!e.target.classList.contains('list-search') && e.target.id !== 'search' && e.target.tagName !== 'LI') {
                    listSearchWrapper.style.display = 'none';
                }
                if (e.target.classList.contains('overlay_active') || e.target.tagName === 'A') {
                    overlay.classList.remove('overlay_active');
                }
            })
        }

        openCloseListTowns()


        //фильтрация элементов при вводе в инпут
        search.addEventListener('input', (e) => {
            listSearch.innerHTML = '';


            if (e.target.value === '') {
                respJSON.features.forEach(item => {
                    listSearch.innerHTML += `
                    <li class="test">${item.properties.hintContent}</li>
                `;
                })
            }

            respJSON.features.filter(item => {
                for (let i = 0; i < e.target.value.length; i++) {
                    if (item.name.toLowerCase().includes(e.target.value.toLowerCase()) && item.name.indexOf(e.target.value.toLowerCase()) <= e.target.value.length) {
                        return item
                    } else {
                        return null
                    }
                }
            }).forEach(elemLi => {
                listSearch.innerHTML += `
                    <li class="test">${elemLi.properties.hintContent}</li>
                `;
            })

        })


        //создание yandex карты и открытие, закрытие popup'a с картой

        mapTrigger.addEventListener('click', () => {
            overlay.classList.add('overlay_active');
            function init() {
                let map = new ymaps.Map('map', {
                    center: [55.6233267145899, 38.86243310321032],
                    zoom: 10,
                }),
                    objectManager = new ymaps.ObjectManager();

                objectManager.objects.options.set('preset', 'islands#blueDotIcon');
                objectManager.add(respJSON.features);
                map.geoObjects.add(objectManager);

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
        })

        closeMap.addEventListener('click', () => {
            overlay.classList.remove('overlay_active');
        })





    })()
})







