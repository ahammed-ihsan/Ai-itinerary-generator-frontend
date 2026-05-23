import NavbarComponent from "../components/NavbarComponent";
import { useEffect, useState } from "react";
import { getAllItineraries } from "../services/itineraryService";
import { Link } from "react-router-dom";
import { generateItinerary } from "../services/itineraryService";

const HomePage = () => {
  const [itineraries, setItineraries] = useState([]);
  const [files, setFiles] = useState([]);console.log(files);
  const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const data = await getAllItineraries();
//     setItineraries(data);
//   };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);console.log(selectedFiles);

    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];

    const validFiles = selectedFiles.filter((file) =>
      allowedTypes.includes(file.type)
    );

    if (validFiles.length !== selectedFiles.length) {
      alert("Some files are invalid.");
    }

    setFiles(validFiles);
  };

  const handleGenerate = async () => {
    if (files.length === 0) {
      return alert("Please upload files");
    }

    try {
      setLoading(true);

      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      await generateItinerary(formData);

      alert("Itinerary Generated");

      setFiles([]);

    //   fetchData();
    } catch (error) {
      alert("Generation Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarComponent />

      <div className="container min-vh-100 py-5 d-flex flex-column justify-content-center align-items-center">        
        <div className="row w-100 d-flex justify-content-center">

                  
          <div className="col-md-6 col-lg-4">
            <div className="card shadow border-0 p-4 h-100">
              <h4 className="mb-4">Upload Documents</h4>

              <input
                type="file"
                required
                multiple
                className="form-control mb-3"
                accept=".pdf,.png,.jpeg,.jpg,.img"
                onChange={handleFileChange}
              />

              <button
                className="btn btn-dark"
                onClick={handleGenerate}
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Itinerary with AI"}
              </button>
            </div>            
          </div>          

          {/* <div className="">
            <div className="card shadow border-0 p-4 h-100">
              <h4 className="mb-4">Recent Itineraries</h4>

              {itineraries.slice(0, 4).map((item) => (
                <div
                  key={item._id}
                  className="border rounded p-3 mb-3"
                >
                  <h5>{item.title}</h5>
                  <p>{item.start_date}</p>

                  <Link
                    className="btn btn-outline-dark btn-sm"
                    to={`/itinerary/${item._id}`}
                  >
                    View
                  </Link>
                </div>
              ))}

              <Link
                to="/itineraries"
                className="btn btn-dark mt-3"
              >
                View More
              </Link>
            </div>
          </div>         */}
        </div>   
        {/* <Link
                    className="btn btn-dark w-25 mt-5"
                    to={`/itineraries`}
                  >
                    View All Itineraries  
                  </Link>      */}
                  <div className="text-center mt-4">
              <Link
                className="btn btn-outline-dark px-4"
                to="/itineraries"
              >
                View All Itineraries
              </Link>
            </div>
      </div>
    </>
  );
};

export default HomePage;