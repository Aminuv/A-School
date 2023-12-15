import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';


// Create a new Course
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};


// Delete a Course
export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id)
  //check if course exists
  if (!listing) {
    return next(errorHandler(404, 'course not found!'));
  }
  //check if user is the owner of the course
  // if (req.user.id !== listing.userRef) {
  //   return next(errorHandler(401, 'You can only delete your own courses!'));
  // }
  //delete course
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('course deleted successfully');
  } catch (error) {
    next(error);
  }
};

// Update a Course
export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'course not found!'));
  }
  // if (req.user.id !== listing.userRef) {
  //   return next(errorHandler(401, 'You can only update your own courses!'));
  // }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

// Get a Course
export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'course not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

// Get all Courses
export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer; 
    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }
    
    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';
    
    // order  of showing listings from newest to oldest
    const order = req.query.order || 'desc';

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
