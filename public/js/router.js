class Router {
  constructor(routes, el) {
    this.routes = routes;
    this.el = el;
    window.onhashchange = this.hashChanged.bind(this);
    this.hashChanged();
    this.getImageData();
  }
  async getImageData() {
    const response = await fetch('/public/images.json')
    const images = await response.json();
    localStorage.setItem('images', JSON.stringify(images.images));
}

  async hashChanged(ev) {
    if (window.location.hash.length > 0) {
      const pageName = window.location.hash.substr(1);
      this.show(pageName);
    } else {
      this.show('default');
    }
  }

  async show(pageName) {
    let regex;
    if (pageName.lastIndexOf('/') > 0) {
      pageName = pageName.slice(1, pageName.lastIndexOf('/')) + "/:";
      regex = pageName + "*";
    }
    const activeRoute = this.routes.filter((route) => {
      if(regex){
        return route.path.match(regex);
      }
      return route.path == pageName;
    });
    const page = activeRoute[0].page;
    await page.load();
    this.el.innerHTML = '';
    page.show(this.el);
  }
}

