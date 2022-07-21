import { pointsGetDB } from "../common/pointsGet";
import { pointsCreateDB } from "../common/pointsCreate";
import { pointsPatchDB } from "../common/pointsPatch";

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

  if (ctx.body.currentState === 'order-created'){
    const plus = Math.trunc(value / 100);

    let customer = await pointsGetDB(ctx.clients.masterdata, userProfileId);

    if (!customer)
      customer = await pointsCreateDB(ctx.clients.masterdata, userProfileId, plus)
    else
      await pointsPatchDB(ctx.clients.masterdata, customer.userId, '' + (customer.points + plus))
  }
  else
    console.log('Debit points', userProfileId, Math.trunc(value / 100));

  await next()
}
