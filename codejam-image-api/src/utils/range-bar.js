export default class RangeBar {
    constructor() {
        this.container = null;
        this.rangeBar = null;
    }

    init() {
        this.container = document.createElement('form');
        this.container.classList.add('range-bar-component');


        this.rangeBar = document.createElement('input');
        this.rangeBar.classList.add('range-bar-component__bar');
        this.rangeBar.setAttribute('id', 'range-bar');
        this.rangeBar.setAttribute('type', 'range');
        this.rangeBar.setAttribute('min', '1');
        this.rangeBar.setAttribute('max', '3');
        this.rangeBar.setAttribute('value', '1');
        this.container.appendChild(this.rangeBar);


        this.rangeBarOutput = document.createElement('output');
        this.rangeBarOutput.setAttribute('name', 'range-output');
        this.rangeBarOutput.setAttribute('for', 'range-bar');
        this.rangeBarOutput.textContent = '128';
        this.container.appendChild(this.rangeBarOutput);

        document.querySelector('main').appendChild(this.container);

        this.rangeBar.addEventListener('input', () => {
            switch (this.rangeBar.value) {
                case '1':
                    this.rangeBarOutput.textContent = '128';
                    this.rangeBarOutput.style.marginLeft = `${-13}px`;
                    break;
                case '2':
                    this.rangeBarOutput.textContent = '256';
                    this.rangeBarOutput.style.marginLeft = `${241}px`;
                    break;
                case '3':
                    this.rangeBarOutput.textContent = '512';
                    this.rangeBarOutput.style.marginLeft = `${495}px`;
                    break;
                default:
                    break;
            }
        });
    }
}
