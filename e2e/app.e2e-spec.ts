import { YaScrumPage } from './app.po';

describe('ya-scrum App', () => {
  let page: YaScrumPage;

  beforeEach(() => {
    page = new YaScrumPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
