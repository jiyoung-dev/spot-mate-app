const axios = require("axios");
require("dotenv").config();

const HttpError = require("../models/http-error");

const API_KEY = process.env.API_KEY;

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }

  const coordinates = data.results[0].geometry.location; // { "lat": 37.4224428, "lng": -122.0842467 }

  return coordinates;
}

module.exports = getCoordsForAddress;
