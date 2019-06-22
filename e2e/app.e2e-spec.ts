import { CostumaqUiPage } from './app.po';

describe('costumaq-ui App', () => {
  let page: CostumaqUiPage;

  beforeEach(() => {
    page = new CostumaqUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
