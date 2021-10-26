import { FakeActivatedRoute } from "./activated-route.fake";

export class FakeRouter {

    public navigateWasCalled = 0;
    public navigateWasCalledTokens: Array<any> = [];
    public navigateWasCalledOptions = {};

    constructor(
        private readonly activatedRoute: FakeActivatedRoute
    ) {
    }

    public navigate(tokens: Array<any>, options: any): void {
        this.navigateWasCalled++;
        this.navigateWasCalledTokens = tokens;
        this.navigateWasCalledOptions = options;
        if (!!options) {
            if (options.queryParams) {
                this.activatedRoute.nextQueryParamMap(options.queryParams);
            }
        }
    }

    public tearDown(): void {
    }
}