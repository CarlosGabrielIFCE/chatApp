import { User } from "./user.model";

export class Occurrence {
    $key: string;
    public name: string;
    public description: string;
    public photo: string;
    public dtOcorrencia: string;
    public hrOcorrencia: string;
    public author: User;

    public constructor() {}

}