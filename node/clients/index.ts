import { IOClients } from "@vtex/api";
import { OMS } from "@vtex/clients";
import Points from './points';

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
    public get order() {
        return this.getOrSet('order', OMS)
    }

    public get points() {
        return this.getOrSet('points', Points);
    }
}
