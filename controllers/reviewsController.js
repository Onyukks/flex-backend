const path = require('path');
const fs = require('fs');
const { normalizeReviews } = require('../utils/normalizeReviews');

// Controller for fetching and normalizing reviews from Hostaway API
async function getHostawayReviews(req, res) {
  try {
    // Read mock reviews from the JSON file
    const filePath = path.join(__dirname, '../data/mockReviews.json');
    const rawData = fs.readFileSync(filePath);
    const mockResponse = JSON.parse(rawData);

    // Normalize the review data
    const normalizedReviews = normalizeReviews(mockResponse);

    // Send the normalized reviews as a response
    res.json({
      status: 'success',
      result: normalizedReviews
    });

  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch or normalize reviews', details: err.message });
  }
}
async function getPropertyReviews(req, res) {

 const filePath = path.join(__dirname, '../data/mockReviews.json');
 const rawData = fs.readFileSync(filePath);
  const reviewsData = JSON.parse(rawData)

  const { listingName } = req.query; // now from ?listingName=...
  const filteredReviews = reviewsData.filter(r => r.listingName === listingName);
  if (!filteredReviews.length) return res.status(404).json({ error: "No reviews found" });
  res.json({ status: 'success', result: filteredReviews });
}

const filePath = path.join(__dirname, '../data/mockProperties.json');

function readProperties() {
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData);
}

function writeProperties(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// GET reviews that are added to site
function getPropertyDetail(req, res) {
  const { listingName } = req.params;
  const properties = readProperties();
  const property = properties.find(p => p.listingName === listingName);

  if (!property) return res.status(404).json({ error: "Property not found" });

  // Only include reviews where addedToSite = true
  const filteredReviews = property.reviews.filter(r => r.addedToSite);

  res.json({
    status: 'success',
    result: { ...property, reviews: filteredReviews }
  });
}

// PATCH review to add to website
function addReviewToSite(req, res) {
  const { listingName, reviewId } = req.params;
  const properties = readProperties();
  const property = properties.find(p => p.listingName === listingName);

  if (!property) return res.status(404).json({ error: "Property not found" });

  const review = property.reviews.find(r => r.id === parseInt(reviewId));
  if (!review) return res.status(404).json({ error: "Review not found" });

  review.addedToSite = true;
  writeProperties(properties);

  res.json({ status: 'success', review });
}

function getAllPropertyReviews(req, res) {
  const { listingName } = req.params;
  const properties = readProperties();
  const property = properties.find(p => p.listingName === listingName);
  if (!property) return res.status(404).json({ error: "Property not found" });

  res.json({ status: 'success', result: property.reviews }); // includes addedToSite
}




module.exports = { getHostawayReviews, getPropertyReviews,getPropertyDetail, addReviewToSite, getAllPropertyReviews };
