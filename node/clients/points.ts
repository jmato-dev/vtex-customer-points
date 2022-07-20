import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class Points extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://jmatoorderlistener--dreamscape.myvtex.com/_v/customer_points', context, options)
  }

  public async getPoints(userId: string): Promise<string> {
    return this.http.get(`/${userId}`);
  }
}