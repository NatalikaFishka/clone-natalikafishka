export class SearchBar {

    constructor() {
        this.container = null;
        this.loadButton = null;
        this.searchBarContainer = null;
        this.searchBar = null;
        this.bwButton = null;
    }

    init() {
        this.container = document.createElement('div');
        this.container.classList.add('search-component')

        this.loadButton = document.createElement('button');
        this.loadButton.classList.add('search-component__load-btn')
        this.loadButton.setAttribute('id', 'load-btn');
        this.loadButton.setAttribute('type', 'button');
        this.loadButton.innerText = 'Load';
        this.container.appendChild(this.loadButton);

        this.searchBarContainer = document.createElement('div');
        this.searchBarContainer.classList.add('search-component__bar-container')
        this.container.appendChild(this.searchBarContainer);

        this.searchBar = document.createElement('input');
        this.searchBar.classList.add('search-component__field')
        this.searchBar.setAttribute('id', 'searchbar');
        this.searchBar.setAttribute('type', 'text');
        this.searchBar.setAttribute('name', 'search');
        this.searchBar.setAttribute('placeholder', 'Search for city');
        this.searchBarContainer.appendChild(this.searchBar);

        this.bwButton = document.createElement('button');
        this.bwButton.classList.add('search-component__bw-btn')
        this.bwButton.setAttribute('id', 'bw-btn');
        this.bwButton.setAttribute('type', 'button');
        this.bwButton.innerText = 'B&W';
        this.container.appendChild(this.bwButton);

        document.querySelector('main').appendChild(this.container);

    }

    filterCities(cities) {
        if (this.searchBarContainer.querySelector('.cities')) {
            let nodeToRemove = this.searchBarContainer.querySelector('.cities');
            this.searchBarContainer.removeChild(nodeToRemove);
        }

        let inputValue = this.searchBar.value;
        let filteredCities = cities.filter((city) => city.includes(inputValue));



        let searchBarList = document.createElement('ul');
        searchBarList.classList.add('cities');

        filteredCities.forEach((currentCity) => {
            let city = document.createElement('p');
            city.innerText = currentCity;
            searchBarList.appendChild(city);
        });

        this.searchBarContainer.appendChild(searchBarList);

        if (inputValue !== "") {
            this.searchBar.classList.add('show');
            searchBarList.classList.add('show');
        } else {
            this.searchBar.classList.remove('show');
            searchBarList.classList.remove('show');
        }
    }


}