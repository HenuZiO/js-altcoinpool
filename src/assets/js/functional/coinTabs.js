class ItcTabs {
  constructor(target, config) {
    const defaultConfig = {};
    this._config = Object.assign(defaultConfig, config);
    this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
    this._elButtons = this._elTabs.querySelectorAll('.stat-tabs__btn');
    this._elPanes = this._elTabs.querySelectorAll('.stat-tabs__content-item');
    this._eventShow = new Event('tab.itc.change');
    this._init();
    this._events();
  }
  _init() {
    this._elTabs.setAttribute('role', 'tablist');
    this._elButtons.forEach((el, index) => {
      el.dataset.index = index;
      el.setAttribute('role', 'tab');
      this._elPanes[index].setAttribute('role', 'tabpanel');
    });
  }
  show(elLinkTarget) {
    const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
    const elLinkActive = this._elTabs.querySelector('.stat-tabs__btn--active');
    const elPaneShow = this._elTabs.querySelector('.stat-tabs__content-item--show');
    if (elLinkTarget === elLinkActive) {
      return;
    }
    elLinkActive ? elLinkActive.classList.remove('stat-tabs__btn--active') : null;
    elPaneShow ? elPaneShow.classList.remove('stat-tabs__content-item--show') : null;
    elLinkTarget.classList.add('stat-tabs__btn--active');
    elPaneTarget.classList.add('stat-tabs__content-item--show');
    this._elTabs.dispatchEvent(this._eventShow);
    elLinkTarget.focus();
  }
  showByIndex(index) {
    const elLinkTarget = this._elButtons[index];
    elLinkTarget ? this.show(elLinkTarget) : null;
  };
  _events() {
    this._elTabs.addEventListener('click', (e) => {
      const target = e.target.closest('.stat-tabs__btn');
      if (target) {
        e.preventDefault();
        this.show(target);
      }
    });
  }
}

const elTab = document.querySelector('.stat-tabs');
const tab = new ItcTabs(elTab);
const index = localStorage.getItem('tabs-index');

index > -1 ? tab.showByIndex(index) : null;

elTab.addEventListener('tab.itc.change', (e) => {
  const index = elTab.querySelector('.stat-tabs__btn--active').dataset.index;
  localStorage.setItem('tabs-index', index);
});

new ItcTabs('.stat-tabs');

