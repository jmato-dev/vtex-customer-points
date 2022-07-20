import { json } from 'co-body';

export async function pointsCreateService(ctx: Context, next: () => Promise<any>) {
    const body = await json(ctx.req);

    if (!body.points || !body.userId)
      console.log('body erro');

    let [storedCustomer] = await ctx.clients.masterdata.searchDocuments<{id: string, points: number, userId: string}>({
        dataEntity: 'customer_points',
        fields: ['id', 'points', 'userId'],
        pagination: {
          page: 1,
          pageSize: 1,
        },
        schema: 'v1',
        where: `userId=${body.userId}`
    });

    if (storedCustomer){
        console.log('erro');
    }

    await ctx.clients.masterdata.createDocument({
        dataEntity: 'customer_points',
        fields: {
            userId: body.userId,
            points: body.points
        },
        schema: 'v1',
    });

    [storedCustomer] = await ctx.clients.masterdata.searchDocuments<{id: string, points: number, userId: string}>({
        dataEntity: 'customer_points',
        fields: ['id', 'points', 'userId'],
        pagination: {
          page: 1,
          pageSize: 1,
        },
        schema: 'v1',
        where: `userId=${body.userId}`
    });

    ctx.status = 200;
    ctx.body = storedCustomer;
    ctx.set('Cache-Control', 'no-store, no-cache, must-revalidate');

    next();
}