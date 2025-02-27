import axios from "axios";

export const getAddressCoordinates = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  if (!apiKey) {
    console.error("Google Maps API key is missing.");
    return null;
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    console.log("Google API Response:", response.data); // 👀 Log full response

    if (response.data.status !== "OK") {
      console.error("Google API error:", response.data.status, response.data.error_message || "");
      return null;
    }

    return {
      lat: response.data.results[0].geometry.location.lat,
      lon: response.data.results[0].geometry.location.lng,
    };
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    return null;
  }
};

export const getDistanceAndTime = async (address1, address2) => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    address1
  )}&destinations=${encodeURIComponent(address2)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status !== "OK")
      throw new Error("Error fetching distance and time");

    const { distance, duration } = response.data.rows[0].elements[0];
    return { distance: distance.text, duration: duration.text };
  } catch (error) {
    console.error("Error fetching distance and time:", error);
    return null;
  }
};

export const getAutoSuggestions = async (input) => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
  
  try {
      const response = await axios.get(url);
      if (response.data.status !== "OK") throw new Error("No suggestions found");
      
      return response.data.predictions.map(prediction => prediction.description);
  } catch (error) {
      console.error("Error fetching auto-suggestions:", error);
      return [];
  }
};
