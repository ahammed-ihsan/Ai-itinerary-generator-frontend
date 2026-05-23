import axiosInstance from "../api/axiosInstance";

export const generateItinerary = async (formData) => {
  const response = await axiosInstance.post(
    "/upload",
    formData
  );

  return response.data;
};

export const getAllItineraries = async () => {
  const response = await axiosInstance.get("/itinerary");
  return response.data;
};

export const getItineraryById = async (id) => {
  const response = await axiosInstance.get(`/itinerary/${id}`);
  return response.data;
};

export const createItineraryShareLink = async (id) => {
  const response = await axiosInstance.post(`/itinerary/${id}/share`);
  return response.data;
};

export const getItineraryByshareLink = async (shareId) => {
  const response = await axiosInstance.get(`/itinerary/share/${shareId}`);
  return response.data;
};