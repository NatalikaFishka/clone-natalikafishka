export default class ToastService {
  static displayToast(message) {
    if (this.instance) {
      this.closeToast();
    }

    const toastHTML = `<div class="toast">${message}</div>
                        <button>×</button>`;

    this.instance = document.createElement('div');
    this.instance.classList.add('toast-container');
    this.instance.innerHTML = toastHTML;
    document.body.appendChild(this.instance);

    this.listener = this.instance.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        this.closeToast();
      }
    });

    this.timeout = setTimeout(() => this.closeToast(), 300000);
  }

  static closeToast() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    if (this.instance) {
      this.instance.remove();
      this.instance.removeEventListener('click', this.listener);
      this.instance = undefined;
    }
  }
}
