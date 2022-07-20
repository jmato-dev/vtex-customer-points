export async function pointsGetHandler(ctx: Context, next: () => Promise<any>) {
    const {
      vtex: {
        route: { params },
      },
    } = ctx;

    let status = 200, body = null;

    const [storedCustomer] = await ctx.clients.masterdata.searchDocuments<{points: number, userId: string}>({
      dataEntity: 'customer_points',
      fields: ['points', 'userId'],
      pagination: {
        page: 1,
        pageSize: 1,
      },
      schema: 'v1',
      where: `userId=${params.userId}`
    });

    if (storedCustomer) {
      body = storedCustomer.points;
    }
    else {
      status = 404;
    }

    // else {
    //   await ctx.clients.masterdata.createDocument({
    //     dataEntity: 'customer_points',
    //     fields: {
    //       userId: params.userId,
    //       points: 0,
    //     },
    //     schema: 'v1'
    //   });
    // }

    ctx.status = status;

    if (status === 200)
      ctx.body = body;

    ctx.set('Cache-Control', 'no-store, no-cache, must-revalidate');

    await next();
}