import { FakeActivatedRoute } from './activated-route.fake';

export class FakeRouter {

    public navigateWasCalled = 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public navigateWasCalledTokens: Array<any> = [];
    public navigateWasCalledOptions = {};

    constructor(
        private readonly activatedRoute: FakeActivatedRoute
    ) {
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public navigate(tokens: Array<any>, options: any): void {
      this.navigateWasCalled++;
      this.navigateWasCalledTokens = tokens;
      this.navigateWasCalledOptions = options;
      if (options) {
        if (options.queryParams) {
          this.activatedRoute.nextQueryParamMap(options.queryParams);
        }
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public tearDown(): void {
    }
}