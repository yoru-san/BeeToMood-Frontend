import { mailHour } from "./mailHour";

export class Group {
    _id?: string;
    name: string;
    nextNotificationDate: mailHour;
}
