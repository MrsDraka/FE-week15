import React from "react";
import Review from "./Review";

export default class ReviewList extends React.Component {
  render() {
    const { reviews, onDelete, onEdit } = this.props;
    return (
      //Goes through all of the reviews and sends each one to the Review component
      <div>
        {reviews.map((review, index) => (
          <Review
            key={index}
            review={review}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    );
  }
}
