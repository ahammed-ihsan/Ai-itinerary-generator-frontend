import { useEffect, useState } from "react";
import { getAllItineraries } from "../services/itineraryService";
import { Link } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";

const ItineraryListPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getAllItineraries();console.log(res);
    setData(res);
  };

  return (
    <>
    <NavbarComponent />
    <div className="container py-5">
      <div className="card shadow border-0 p-4">
        <div className="d-flex justify-content-between">
        <h2 className="mb-4">Itineraries</h2>
        <button className="btn btn-outline-dark mb-3" onClick={() => window.history.back()}>
          Back
        </button>
      </div>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Start</th>
                <th>End</th>
                <th>Days</th>
                <th></th>
              </tr>
            </thead>

            {data.length === 0 && (
              <tbody>
                <tr>
                  <td colSpan="5" className="text-center">
                    No itineraries found.
                  </td>
                </tr>
              </tbody>
            )}

            <tbody>
              {data?.map((item) => (
                <tr key={item._id}>
                  <td>{item.itinerary?.title}</td>
                  <td>{item.itinerary?.start_date}</td>
                  <td>{item.itinerary?.end_date}</td>
                  <td>{item.itinerary?.total_days}</td>

                  <td>
                    <Link
                      to={`/itinerary/${item._id}`}
                      className="btn btn-dark btn-sm"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default ItineraryListPage;