import { browser, element, by } from 'protractor';

export class Projekt2Page {

  navigateTo(route: string) {
    return browser.get(route);
  }

  getToolbarTitle() {
    return element(by.className('toolbar-title')).getText();
  }

  getAboutHeader() {
    return element(by.css('.about h1')).getText();
  }
}
