import { IOClients } from "@vtex/api";
import { OMS } from "@vtex/clients";

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
    public get order() {
        return this.getOrSet('order', OMS)
    }
}
