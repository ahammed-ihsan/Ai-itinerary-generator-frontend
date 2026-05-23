import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItineraryById, createItineraryShareLink } from "../services/itineraryService";
import NavbarComponent from "../components/NavbarComponent";

const ItineraryViewPage = () => {
  const { id } = useParams();

  const [itinerary, setItinerary] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getItineraryById(id);console.log(data);
    setItinerary(data.itinerary);
  };

  if (!itinerary) return <h3>Loading...</h3>;
  const shareData = {
    title: "Itinerary",
    text: "Check this out!",
    url: "",
  };

  const handleShare = async () => {
    try {
        const res = await createItineraryShareLink(id);console.log(res);
        shareData.url = res?.shareLink;
        shareData.text = `Check out my itinerary: ${itinerary.title} `;
      if (navigator.share) {
        await navigator.share(shareData);
        console.log("Shared successfully");
      } else {
        await navigator.clipboard.writeText(res?.shareLink);
        alert("Link copied to clipboard");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <>
    <NavbarComponent />

    <div className="container py-5">
        <button className="btn btn-dark mb-3" onClick={()=>{handleShare()}}>share</button>

      <div className="position-relative card shadow border-0 p-4">
        <div className="d-flex justify-content-between">
        <h2>{itinerary.title}</h2>
        {/* <button className="position-absolute top-0 end-0 btn btn-outline-dark m-3" onClick={() => window.history.back()}>
          Back
        </button> */}
        <button className="btn btn-outline-dark mb-3" onClick={() => window.history.back()}>
          Back
        </button>
        </div>

        <p>
          {itinerary.start_date} - {itinerary.end_date}
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
            {itinerary.daily_itinerary.map((day, index) => (
              <option key={index} value={index}>
                Day {day.day}
              </option>
            ))}
          </select>
        </div>

        <div>
          {itinerary.daily_itinerary[selectedDay]?.timeline.map(
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
    </>
  );
};

export default ItineraryViewPage;