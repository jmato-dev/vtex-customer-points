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

  if (ctx.body.currentState === 'order-created')
    console.log('Add points', userProfileId, value);
  else
    console.log('Debit points', userProfileId, value);

  await next()
}
