'use strict';

class Page {
  constructor(url) {
    this.url =  url;
  }

  load() {
    return $.get(this.url).then(res => this.html = res);
  }

  show(el) {
    el.innerHTML = this.html;
  }

  init(){

  }

}
