function normalizeReviews(reviews) {
  return reviews.map(review => ({
    id: review.id,
    type: review.type,
    status: review.status,
    guestName: review.guestName,
    publicReview: review.publicReview,
    categories: review.reviewCategory.map(c => ({
      category: c.category,
      rating: c.rating
    })),
    submittedAt: new Date(review.submittedAt),
    listingName: review.listingName,
    channel: review.channel || 'unknown',
  }));
}

module.exports = { normalizeReviews };
