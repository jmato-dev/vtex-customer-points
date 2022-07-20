import { json } from 'co-body';

export async function pointsPatchHandler(ctx: Context, next: () => Promise<any>) {
    const {
        vtex: {
          route: { params },
        },
    } = ctx;

    const body = await json(ctx.req);

    if (!body.points)
      console.log('body erro');

    const [storedCustomer] = await ctx.clients.masterdata.searchDocuments<{id: string}>({
        dataEntity: 'customer_points',
        fields: ['id'],
        pagination: {
          page: 1,
          pageSize: 1,
        },
        schema: 'v1',
        where: `userId=${params.userId}`
    });

    if (!storedCustomer)
        console.log('erro');


    await ctx.clients.masterdata.createOrUpdatePartialDocument({
        dataEntity: 'customer_points',
        fields: {
            points: parseInt(body.points)
        },
        id: storedCustomer.id,
        schema: 'v1',
    });

    ctx.status = 200;
    ctx.body = {points: parseInt(body.points)};

    ctx.set('Cache-Control', 'no-store, no-cache, must-revalidate');

    next();
}