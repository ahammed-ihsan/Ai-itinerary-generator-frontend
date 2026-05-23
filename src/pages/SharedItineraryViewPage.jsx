import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItineraryByshareLink } from "../services/itineraryService";

const SharedItineraryViewPage = () => {
    const { id } = useParams();console.log(id);
    const [selectedDay, setSelectedDay] = useState(0);
    const [itinerary, setItinerary] = useState(null);

    useEffect(() => {
        const fetchData = async () => {   
            console.log('use');
            try{
                const data = await getItineraryByshareLink(id);console.log(data);
                setItinerary(data.itinerary);
            }catch(err){
                console.log(err);
            }        
        
        };

        fetchData();
    }, []);

    
  return (
    <div className="container py-5">
        {/* <button className="btn btn-dark" onClick={()=>{handleShare()}}>share</button> */}

      <div className="position-relative card shadow border-0 p-4">
        <div className="d-flex justify-content-between">
        <h2>{itinerary?.title}</h2>
        {/* <button className="position-absolute top-0 end-0 btn btn-outline-dark m-3" onClick={() => window.history.back()}>
          Back
        </button> */}
        {/* <button className="btn btn-outline-dark mb-3" onClick={() => window.history.back()}>
          Back
        </button> */}
        </div>

        <p>
          {itinerary?.start_date} - {itinerary?.end_date}
        </p>

        <div className="mb-4">
          <label className="form-label">
            Select Day
          </label>

          <select
            className="form-select"
            onChange={(e) =>
              setSelectedDay(e.target.value)
            }
          >
            {itinerary?.daily_itinerary.map((day, index) => (
              <option key={index} value={index}>
                Day {day.day}
              </option>
            ))}
          </select>
        </div>

        <div>
          {itinerary?.daily_itinerary[selectedDay]?.timeline.map(
            (item, index) => (
              <div
                key={index}
                className="border rounded p-3 mb-3"
              >
                <h5>{item.title}</h5>

                <p>
                  <strong>Time:</strong> {item.time}
                </p>

                <p>
                  <strong>Type:</strong> {item.type}
                </p>

                <p>{item.details}</p>

                <p>
                  <strong>Location:</strong> {item.location}
                </p>
              </div>
            )
          )}
        </div>

      </div>
    </div>
  )
}

export default SharedItineraryViewPage
