import { Console } from 'console';
import React, { useLayoutEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating';
import { getRoomsData } from '../Api/Api';
import { Room } from './Room';
import RoomCard from './RoomCard';

interface HotelCardProps {
    id: string;
    name: string;
    address1: string;
    address2: string;
    rating: string;
    selectedRating: number;
    images: image[];
    adultsSelected: number;
    childrenSelected: number;
}

export type image = {
    url: string;
}


function HotelCard({ id, name, address1, address2, rating, selectedRating, images, adultsSelected, childrenSelected }: HotelCardProps) {

    const [loading, setLoading] = useState(false);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [empty, setEmpty] = useState(false);
    const [multipleImagesControls, setMultipleImagesControls] = useState(true);


    useLayoutEffect(() => {
        async function loadRooms() {
            if (images.length <= 1) {
                setMultipleImagesControls(false);
            }
            setEmpty(false);
            const data = await getRoomsData.get(id);
            console.log(data)
            data.rooms.forEach((room: Room) => {
                if (room.occupancy.maxOverall == undefined) {
                    room.occupancy.maxOverall = room.occupancy.maxAdults + room.occupancy.maxChildren;
                }
            })
            const dataFiltered = data.rooms.filter((room: Room) => {
                return (adultsSelected <= room.occupancy.maxAdults && childrenSelected <= room.occupancy.maxChildren && (adultsSelected + childrenSelected) <= room.occupancy.maxOverall);
            })
            setRooms(dataFiltered)
            setLoading(false);
            if (dataFiltered.length < 1) {
                setEmpty(true)
            }
        }
        loadRooms()

    }, [adultsSelected, childrenSelected, selectedRating]);




    return (
        <>
            <div className="card mb-4 box-shadow" key={name}>
                <div className="card-header bg-warning bg-gradient" >
                </div>
                <div className="card-body">
                    <div className='container pb-5'>
                        <div className='row mb-5' style={{ height: "230px" }}>
                            <div className='col align-self-center'>
                                <div id={(id + "Carousel")} className="carousel slide" data-bs-ride="carousel" >
                                    <div className="carousel-inner">
                                        {images.map((image: image, index: number) => (
                                            <div className={index == 0 ? "carousel-item active" : "carousel-item"} key={image.url.substring(image.url.length - 20, image.url.length)}>
                                                <img src={image.url} className="d-block w-100" alt={image.url.substring(image.url.length - 20, image.url.length)} height="300" style={{ objectFit: "cover" }} />
                                            </div>
                                        ))
                                        }
                                    </div>
                                    {multipleImagesControls && (
                                        <div>
                                            <button className="carousel-control-prev" type="button" data-bs-target={("#" + id + "Carousel")} data-bs-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true" />
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button className="carousel-control-next" type="button" data-bs-target={("#" + id + "Carousel")} data-bs-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true" />
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='col text-start'>
                                <h1 className="display-4" >{name}</h1>
                                <h4 className="card-title pricing-card-title">{address1}</h4>
                                <h4 className="card-title pricing-card-title">{address2}</h4>
                            </div>
                            <div className='col text-end'>
                                <h4 className="card-title pricing-card-title"><Rating initialValue={parseInt(rating)} readonly={true} ratingValue={0} /></h4>
                            </div>
                        </div>
                    </div>
                    <div key={id} className="card">
                        {!loading && (
                            <ul className="list-group list-group-flush">
                                {rooms.map(room => (
                                    <RoomCard id={room.id} longDescription={room.longDescription} name={room.name} maxAdults={room.occupancy.maxAdults} maxChildren={room.occupancy.maxChildren} shortDescription={room.shortDescription} />
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                {empty && (
                    <div className='alert alert-primary'>
                        No rooms for the current selection.
                    </div>
                )}
            </div>
        </>
    )
}

export default HotelCard