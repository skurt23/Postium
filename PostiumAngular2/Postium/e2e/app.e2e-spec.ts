import { PostiumPage } from './app.po';

describe('postium App', function() {
  let page: PostiumPage;

  beforeEach(() => {
    page = new PostiumPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
