import React from 'react'

interface RoomCardProps {
    id: string;
    name: string;
    shortDescription: string;
    longDescription: string;
    maxAdults: number;
    maxChildren: number;
}

function RoomCard({ id, name, longDescription, maxAdults, maxChildren }: RoomCardProps) {
    return (
        <li className="list-group-item" key={id}>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4 text-start'>
                        <div className='row'>
                            <div className='col lead'>
                                <strong style={{fontSize : 25}}>{name}</strong>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                Adults: {maxAdults}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                Children: {maxChildren}
                            </div>
                        </div>
                    </div>
                    <div className='col-md-8 text-start'>
                        {longDescription}
                    </div>
                </div>
            </div>
        </li>
    )
}

export default RoomCard