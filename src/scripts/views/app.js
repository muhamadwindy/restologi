import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';
import DrawerInitiator from '../utils/drawer-initiator';

class App {
  constructor({ button, drawer, container }) {
    this.button = button;
    this.drawer = drawer;
    this.container = container;
    this.initialAppShell();
  }

  initialAppShell() {
    DrawerInitiator.init({
      button: this.button,
      drawer: this.drawer,
      container: this.container,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this.container.innerHTML = await page.render();
    await page.afterRender();
    const skipLinkElem = document.querySelector('.skip-link');
    skipLinkElem.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('#mainContent').focus();
    });
  }
}

export default App;
