import { json } from 'co-body';

export async function pointsDebitService(ctx: Context, next: () => Promise<any>) {
    const {
        vtex: {
          route: { params },
        },
    } = ctx;

    const body = await json(ctx.req);

    if (!body.points)
      console.log('body erro');
      
    const [storedCustomer] = await ctx.clients.masterdata.searchDocuments<{id: string, points: number, userId: string}>({
        dataEntity: 'customer_points',
        fields: ['id', 'points', 'userId'],
        pagination: {
          page: 1,
          pageSize: 1,
        },
        schema: 'v1',
        where: `userId=${params.userId}`
    });

    if (!storedCustomer)
        console.log('erro');

    const points = storedCustomer.points - body.points >= 0 ? storedCustomer.points - body.points : storedCustomer.points - body.points;

    if (points !== storedCustomer.points)
        await ctx.clients.masterdata.createOrUpdatePartialDocument({
            dataEntity: 'customer_points',
            fields: {
                points
            },
            id: storedCustomer.id,
            schema: 'v1',
        })

    ctx.status = 200;
    ctx.body = points;
    ctx.set('Cache-Control', 'no-store, no-cache, must-revalidate');

    next();
}