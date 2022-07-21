import { json } from 'co-body';
import { pointsCreateDB } from '../common/pointsCreate';

export async function pointsCreateService(ctx: Context, next: () => Promise<any>) {
    const body = await json(ctx.req);

    if (!body.points || !body.userId)
      console.log('body erro');

    const storedCustomer = await pointsCreateDB(ctx.clients.masterdata, body.userId, body.points);

    ctx.status = 200;
    ctx.body = storedCustomer;
    ctx.set('Cache-Control', 'no-store, no-cache, must-revalidate');

    next();
}