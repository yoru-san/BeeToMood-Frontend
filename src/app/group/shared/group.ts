import { mailHour } from "./mailHour";

//Classe de groupe
export class Group {
    _id?: string;
    name: string;
    managerId: string;
    nextNotificationDate: mailHour;
}
