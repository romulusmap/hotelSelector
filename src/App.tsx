import React, { useLayoutEffect, useState } from 'react';
import './App.css';
import { getHotelsData, getRoomsData } from './HotelProject/Api/Api';
import { Hotel } from './HotelProject/Hotels/Hotel';
import HotelCard from './HotelProject/Hotels/HotelCard';
import { Rating } from 'react-simple-star-rating';

function App() {
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [hotelsAll, setHotelsAll] = useState<Hotel[]>([]);
  const [rating, setRating] = useState(60);
  const [childrenCount, setChildrenCount] = useState(0);
  const [adultsCount, setAdultsCount] = useState(0);

  const childFunc = Function;

  const handleRating = (rate: number) => {
    setHotels(hotelsAll.filter((hotel: Hotel) => {
      return (parseInt(hotel.starRating) >= (rate / 20))
    }))
    setRating(rate)
  }
  const addAdults = () => {
    childFunc;
    if (adultsCount < 10) {
      setAdultsCount(prevAdultsCount => prevAdultsCount + 1)
    }
  }
  const addChildren = () => {
    if (childrenCount < 10) {
      setChildrenCount(prevChildrenCount => prevChildrenCount + 1)
    }
  }
  const subtractAdults = () => {
    if (adultsCount > 0) {
      setAdultsCount(prevAdultsCount => prevAdultsCount - 1)
    }
  }
  const subtractChildren = () => {
    if (childrenCount > 0) {
      setChildrenCount(prevChildrenCount => prevChildrenCount - 1)
    }
  }

  useLayoutEffect(() => {
    async function loadHotels() {
      setLoading(true);
      const data = await getHotelsData.get();
      setHotels(data);
      setHotelsAll(data);
      setLoading(false);
    }
    loadHotels()
  }, []);

  return (
    <>
      <div className='container-fluid'>
        <div className='row headerBg'>
          <div className='col'>
          </div>
        </div>
        <div className='row mainRow'>
          <div className='col'>
            <div className="container pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
              <h1 className="display-2 mainTitle">Hotel Selector</h1>
              <div className="headerRow row mt-5 p-2 align-items-center">
                <div className="lead col-md-4">
                  <div className='App'>
                    <Rating onClick={handleRating} ratingValue={rating}/>
                  </div>
                </div>
                <div className="lead col-md-4">
                  <div className='row'>
                    <div className="lead col-md-3">
                    </div>
                    <div className="lead col-md-3">
                      <div className='row'>
                        <div className="lead col-md">
                          Adults:
                        </div>
                      </div>
                    </div>
                    <div className="lead col-md-3">
                      <div className='row'>
                        <div className="lead col-md-4">
                          <i className="bi bi-plus-circle h4 " onClick={addAdults} />
                        </div>
                        <div className="lead col-md-4">
                          <span className='counts'>{adultsCount}</span>
                        </div>
                        <div className="lead col-md-4">
                          <i className="bi bi-dash-circle h4" onClick={subtractAdults} />
                        </div>
                      </div>
                    </div>
                    <div className="lead col-md-3">
                    </div>
                  </div>
                </div>
                <div className="lead col-md-4">
                  <div className='row'>
                    <div className="lead col-md-3">
                    </div>
                    <div className="lead col-md-3">
                      <div className='row'>
                        <div className="lead col-md">
                          Children:
                        </div>
                      </div>
                    </div>
                    <div className="lead col-md-3">
                      <div className='row'>
                        <div className="lead col-md-4">
                          <i className="bi bi-plus-circle h4 " onClick={addChildren} />
                        </div>
                        <div className="lead col-md-4">
                          <span className='counts'>{childrenCount}</span>
                        </div>
                        <div className="lead col-md-4">
                          <i className="bi bi-dash-circle h4" onClick={subtractChildren} />
                        </div>
                      </div>
                    </div>
                    <div className="lead col-md-3">
                    </div>
                    <div className="lead col-md-3">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {!loading && (
              <div className="center-page">
                <div className="container">
                  <div className="card-deck mb-3 text-center">
                    {hotels.map((hotel: Hotel) => (
                      <HotelCard id={hotel.id} name={hotel.name} address1={hotel.address1} address2={hotel.address2} rating={hotel.starRating} selectedRating={rating} images={hotel.images} adultsSelected={adultsCount} childrenSelected={childrenCount} />
                    ))
                    }
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
