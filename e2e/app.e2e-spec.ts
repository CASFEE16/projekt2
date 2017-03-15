import { Projekt2Page } from './app.po';

describe('Projekt2 App', function() {
  let page: Projekt2Page;

  beforeEach(() => {
    page = new Projekt2Page();
  });

  it('should display toolbar title', (done) => {
    page.navigateTo('/');
    expect(page.getToolbarTitle()).toEqual('Radio App');
    done();
  });

  it('should navigate to about page', (done) => {
    page.navigateTo('/about');
    expect(page.getAboutHeader()).toEqual('Projekt 2');
    done();
  });

});
