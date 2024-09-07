export interface User {
    firstname?: string,
    lastname?: string,
    email?: string
    subscription?: Subscription.FREE,
    imageUrl?: string
}

export enum Subscription {
    FREE, PREMIUM
}