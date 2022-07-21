import { json } from 'co-body';
import { pointsPatchDB } from '../common/pointsPatch';

export async function pointsPatchHandler(ctx: Context, next: () => Promise<any>) {
    const {
        vtex: {
          route: { params },
        },
    } = ctx;

    const body = await json(ctx.req);

    if (!body.points)
      console.log('body erro');

    await pointsPatchDB(ctx.clients.masterdata, <string>params.userId, body.points);

    ctx.status = 200;
    ctx.body = {points: parseInt(body.points)};

    ctx.set('Cache-Control', 'no-store, no-cache, must-revalidate');

    next();
}