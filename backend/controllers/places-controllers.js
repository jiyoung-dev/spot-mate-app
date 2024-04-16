const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/place");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
];

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError("Could not find a place.", 500);
    return next(error);
  }

  if (!place) {
    const error = new HttpError(
      "Could not find a place for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ place: place.toObject() });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!places || places.length === 0) {
    throw new HttpError(
      "Could not find a place for the provided user id.",
      404
    );
  }

  res.json({ places });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, address, creator } = req.body;

  let coordinates;

  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg",
    creator,
  });

  try {
    await createdPlace.save(); // db저장
  } catch (err) {
    const error = new HttpError("Creating place failed.", 500);
    return next(error);
  }

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const placeId = req.params.pid;
  const { title, description } = req.body;

  const updatedPlaceIndex = DUMMY_PLACES.findIndex(
    (place) => place.id === placeId
  );

  DUMMY_PLACES[updatedPlaceIndex].title = title;
  DUMMY_PLACES[updatedPlaceIndex].description = description;

  res.status(200).json({ message: "Place updated successfully." });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;

  // placeId와 일치하는 장소가 있으면 삭제
  if (!DUMMY_PLACES.some((place) => place.id === placeId)) {
    throw new new HttpError("Could not find a place for that id.", 404)();
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((place) => place.id !== placeId);
  res.status(200).json({ message: "Place deleted successfully" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
