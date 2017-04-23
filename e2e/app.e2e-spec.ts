import { RidersappPage } from './app.po';

describe('ridersapp App', () => {
  let page: RidersappPage;

  beforeEach(() => {
    page = new RidersappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
