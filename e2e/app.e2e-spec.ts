import { BildOrdDashboardPage } from './app.po';

describe('bild-ord-dashboard App', function() {
  let page: BildOrdDashboardPage;

  beforeEach(() => {
    page = new BildOrdDashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
