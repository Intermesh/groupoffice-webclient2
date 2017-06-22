import { GroupofficeWebclient2Page } from './app.po';

describe('groupoffice-webclient2 App', () => {
  let page: GroupofficeWebclient2Page;

  beforeEach(() => {
    page = new GroupofficeWebclient2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
