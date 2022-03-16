import React from 'react'

const baseUrl = "https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG";
const roomUrl = "https://obmng.dbm.guestline.net/api/roomRates/OBMNG/";

export const getHotelsData = {
    get() {
        return fetch(baseUrl)
            .then(response => response.json())
    }
}

export const getRoomsData = {
    get(roomId: string = "OBMNG1") {
        return fetch(roomUrl + roomId)
            .then(response => response.json())
    }
}
