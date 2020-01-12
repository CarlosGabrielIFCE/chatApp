import { Event } from "./event.model";

export class Ambient {
    $key: string;
    name: string;
    description: string;
    inReservado: boolean;
    hrReserva: string;
    dtReserva: string;
    events: Event[];
    photo: string;

    constructor() {
        
    }
}