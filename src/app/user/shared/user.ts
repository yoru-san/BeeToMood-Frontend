import { Group } from "../../group/shared/group";

export class User {
    _id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    groups: Group[];
    type: string;
}
