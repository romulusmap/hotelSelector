import { image } from "./HotelCard";

export type Hotel = {
    id: string,
    name: string,
    description: string,
    address1: string,
    address2: string,
    postcode: string,
    town: string,
    country: string,
    countryCode: string,
    starRating: string,
    facilities: object[],
    telephone: string,
    email: string,
    images: image[],
    checkInHours: string,
    checkInMinutes: string,
    checkOutHours: string,
    checkOutMinutes: string
};