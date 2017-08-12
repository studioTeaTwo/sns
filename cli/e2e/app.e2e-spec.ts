import { CliPage } from './app.po';

describe('cli App', () => {
  let page: CliPage;

  beforeEach(() => {
    page = new CliPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
