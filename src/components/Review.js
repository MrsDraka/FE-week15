import React from "react";
import Stars from "./Stars";
import EditReviewForm from "./EditReviewForm";

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      url: "https://65b497ef41db5efd2866a826.mockapi.io/api/v1/reviews", //API url
    };
  }

  //Handles crud operations on reviews below
  handleDelete = () => {
    const { review, onDelete } = this.props;
    onDelete(review.id);
  };

  handleEdit = () => {
    this.setState({ isEditing: true });
  };

  handleSaveEdit = (editedData) => {
    const { review, onEdit } = this.props;
    fetch(`${this.state.url}/${review.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    })
      .then((response) => response.json())
      .then((data) => {
        onEdit(data);
        this.setState({ isEditing: false });
      })
      .catch((error) => {
        console.error("Error updating review:", error);
        this.setState({ isEditing: false });
      });
  };

  //Displays an individual review in a card
  render() {
    const { id, comments, user, createdAt, stars } = this.props.review;

    return (
      <div className="card card-default mb-2">
        <div className="card-body bg-light">
          {this.state.isEditing ? (
            //Form for editing the individual review
            <EditReviewForm
              comments={comments}
              stars={stars}
              onEdit={this.handleSaveEdit}
              id={id}
            />
          ) : (
            <>
              <div>User: {user}</div>
              <Stars value={stars} />
              <div>Comments: {comments}</div>
              <div>Created At: {createdAt}</div>

              <button
                className="btn btn-info btn-sm mx-1"
                onClick={this.handleEdit}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={this.handleDelete}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
}
