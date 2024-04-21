const DrawerInitiator = {
  init({ button, drawer, container }) {
    button.addEventListener('click', (event) => {
      this.toggleDrawer(event, drawer);
    });

    container.addEventListener('click', (event) => {
      this.closeDrawer(event, drawer);
    });
  },

  toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open-menu');
    document.querySelector('.hamb-line').classList.toggle('hamb-line-open');
  },

  closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('open-menu');
    document.querySelector('.hamb-line').classList.remove('hamb-line-open');
  },
};

export default DrawerInitiator;
