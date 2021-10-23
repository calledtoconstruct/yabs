import { FakeActivatedRoute } from "./activated-route.fake";

export class FakeRouter {

    constructor(
        private readonly activatedRoute: FakeActivatedRoute
    ) {
    }

    public navigate(tokens: Array<any>, options: any): void {
        if (tokens.length === 0) {
            if (options.queryParams) {
                this.activatedRoute.nextQueryParamMap(options.queryParams);
            }
        }
    }

    public tearDown(): void {
    }
}