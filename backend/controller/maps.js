import { validationResult } from "express-validator";
import { getAddressCoordinates, getAutoSuggestions, getDistanceAndTime } from "../services/maps.js";

export const getCoordinates = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;
  try {
    const coordinates = await getAddressCoordinates(address);
    if (!coordinates) return res.status(404).json("Coordinates Not Found");
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

export const getDisAndTim = async (req, res) => {  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {   
    return res.status(400).json({ errors: errors.array() });
  }

  const { address1, address2 } = req.query;
  try {
    const disAndTim = await getDistanceAndTime(address1, address2);
    if (!disAndTim) return res.status(404).json("Distance and Time Not Found");
    res.status(200).json(disAndTim);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

export const autoSuggestions = async (req, res) => {
  try {
      const { input } = req.query;
      if (!input || input.length < 3) {
          return res.status(400).json({ error: "Input must be at least 3 characters long" });
      }
      
      const suggestions = await getAutoSuggestions(input);
      res.status(200).json(suggestions);
  } catch (error) {
      console.error("Error in autoSuggestions controller:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};