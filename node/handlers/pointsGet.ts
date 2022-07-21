import { pointsGetDB } from "../common/pointsGet";

export async function pointsGetHandler(ctx: Context, next: () => Promise<any>) {
    const {
      vtex: {
        route: { params },
      },
    } = ctx;

    let status = 200, body = null;

    const storedCustomer = await pointsGetDB(ctx.clients.masterdata, <string>params.userId);

    if (storedCustomer) {
      body = storedCustomer.points;
    }
    else {
      status = 404;
    }

    ctx.status = status;

    if (status === 200)
      ctx.body = body;

    ctx.set('Cache-Control', 'no-store, no-cache, must-revalidate');

    await next();
}