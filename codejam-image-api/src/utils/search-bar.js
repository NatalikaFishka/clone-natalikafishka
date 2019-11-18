export default class SearchBar {
    constructor() {
        this.container = null;
        this.loadButton = null;
        this.searchBarContainer = null;
        this.searchBar = null;
        this.searchBarList = null;
        this.bwButton = null;
        this.cityInput = null;
    }

    init() {
        this.container = document.createElement('div');
        this.container.classList.add('search-component');

        this.loadButton = document.createElement('button');
        this.loadButton.classList.add('search-component__load-btn');
        this.loadButton.setAttribute('id', 'load-btn');
        this.loadButton.setAttribute('type', 'button');
        this.loadButton.setAttribute('disabled', '');
        this.loadButton.innerText = 'Load';
        this.container.appendChild(this.loadButton);

        this.searchBarContainer = document.createElement('div');
        this.searchBarContainer.classList.add('search-component__bar-container');
        this.container.appendChild(this.searchBarContainer);

        this.searchBar = document.createElement('input');
        this.searchBar.classList.add('search-component__field');
        this.searchBar.setAttribute('id', 'searchbar');
        this.searchBar.setAttribute('type', 'text');
        this.searchBar.setAttribute('name', 'search');
        this.searchBar.setAttribute('placeholder', 'Search for city');
        this.searchBarContainer.appendChild(this.searchBar);

        this.bwButton = document.createElement('button');
        this.bwButton.classList.add('search-component__bw-btn');
        this.bwButton.setAttribute('id', 'bw-btn');
        // this.bwButton.setAttribute('disabled', '');
        this.bwButton.setAttribute('type', 'button');
        this.bwButton.innerText = 'B&W';
        this.container.appendChild(this.bwButton);

        document.querySelector('main').appendChild(this.container);
    }

    filterCities(cities) {
        if (this.searchBarContainer.querySelector('.cities')) {
            const nodeToRemove = this.searchBarContainer.querySelector('.cities');
            this.searchBarContainer.removeChild(nodeToRemove);
        }

        const inputValue = this.searchBar.value;
        const filteredCities = cities.filter((city) => city.toLowerCase().includes(inputValue.toLowerCase()));


        this.searchBarList = document.createElement('ul');
        this.searchBarList.classList.add('cities');

        filteredCities.forEach((currentCity) => {
            const city = document.createElement('p');
            city.innerText = currentCity;
            this.searchBarList.appendChild(city);
        });

        this.searchBarContainer.appendChild(this.searchBarList);

        if (inputValue !== '' && filteredCities.length) {
            this.searchBar.classList.add('show');
            this.searchBarList.classList.add('show');
            this.searchBarList.addEventListener('click', (e) => {
                if (e.target.nodeName === 'P') {
                    this.searchBar.value = e.target.textContent;
                    this.searchBar.classList.remove('show');
                    this.searchBarList.classList.remove('show');
                    this._getCityInput(cities);
                }
            });
        } else {
            this.searchBar.classList.remove('show');
            this.searchBarList.classList.remove('show');
        }

        this._getCityInput(cities);
    }

    _getCityInput(cities) {
        if (cities.indexOf(this.searchBar.value) > -1) {
            this.cityInput = this.searchBar.value;
            this.loadButton.removeAttribute('disabled');
            this.searchBar.classList.remove('show');
            this.searchBarList.classList.remove('show');
        } else {
            this.loadButton.setAttribute('disabled', '');
        }
    }
}
