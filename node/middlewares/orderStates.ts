export async function orderStates(
  ctx: StatusChangeContext,
  next: () => Promise<any>
) {
  // The cancel & orders-created statuses are for testing,
  // probably will use payment-approved & caceled
  // see: https://help.vtex.com/en/tutorial/fluxo-de-pedido/

  // console.log(ctx.body);

  const {
    totals: [ { value } ],
    clientProfileData: { userProfileId }
  } = await ctx.clients.order.order(ctx.body.orderId);

  const points = await ctx.clients.points.getPoints(userProfileId);
  console.log ('#### points ####', points);

  if (ctx.body.currentState === 'order-created')
    console.log('Add points', userProfileId, Math.trunc(value / 100));
  else
    console.log('Debit points', userProfileId, Math.trunc(value / 100));

  await next()
}
