import React from "react";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      url: "https://65b497ef41db5efd2866a826.mockapi.io/api/v1/reviews", //API url
    };
  }

  componentDidMount() {
    this.fetchReviews();
  }

  //Gets all the reviews
  fetchReviews() {
    fetch(this.state.url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ reviews: data });
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }

  //Adds a new review
  handleAddReview = (newReview) => {
    fetch(this.state.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState((prevState) => ({
          reviews: [...prevState.reviews, data],
        }));
      })
      .catch((error) => {
        console.error("Error adding review:", error);
      });
  };

  //Deletes review
  handleDeleteReview = (reviewId) => {
    fetch(`${this.state.url}/${reviewId}`, {
      method: "DELETE",
    })
      .then(() => {
        this.setState((prevState) => ({
          reviews: prevState.reviews.filter((review) => review.id !== reviewId),
        }));
      })
      .catch((error) => {
        console.error("Error deleting review:", error);
      });
  };

  //Updates review
  handleEditReview = (editedReview) => {
    this.fetchReviews();
  };

  //Renders the reviews on the page
  render() {
    return (
      <div className="container">
        <h1>Hotel Reviews</h1>
        {/*Renders the review form */}
        <ReviewForm onSubmit={this.handleAddReview} />{" "}
        {/*Renders all prior reviews */}
        <ReviewList
          reviews={this.state.reviews}
          onDelete={this.handleDeleteReview}
          onEdit={this.handleEditReview}
        />
      </div>
    );
  }
}
