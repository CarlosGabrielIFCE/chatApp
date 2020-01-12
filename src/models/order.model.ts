import { User } from "./user.model";

export class Order {
    $key: string;
    name: string;
    lastModified: string;
    status: string;
    destinatary: User;
    description: string;
    signature: string;
}