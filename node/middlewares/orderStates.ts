export async function orderStates(
  ctx: StatusChangeContext,
  next: () => Promise<any>
) {
  // The cancel & orders-created statuses are for testing,
  // probably will use payment-approved & caceled
  // see: https://help.vtex.com/en/tutorial/fluxo-de-pedido/

  // Call Orders API to get details about amount & user
  // Use ctx.vtex.authToken for call IO APIs
  // Use ctx.body.orderId

  console.log(ctx.body);
  
  if (ctx.body.currentState === 'order-created')
    console.log('Add points');
  else
    console.log('Debit points');

  await next()
}
