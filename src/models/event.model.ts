import { Ambient } from "./ambient.model";
import { User } from "./user.model";

export class Event {
    $key: string;
    name: string;
    description: string;
    dtEvento: string;
    hrEvento: string;
    ambiente: Ambient;
    qtPessoas: number;
    author: User;
}