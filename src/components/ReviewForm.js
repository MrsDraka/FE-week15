import React from "react";

export default class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: "",
      user: "",
      stars: 1, // Default star value
    };
  }

  //updates changes
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //updates star value
  handleStarsChange = (event) => {
    this.setState({ stars: parseInt(event.target.value) });
  };

  //submits form
  handleSubmit = (event) => {
    event.preventDefault();

    const newReview = {
      comments: this.state.comments,
      user: this.state.user,
      stars: this.state.stars,
      createdAt: new Date().toISOString(), // retrieves current date
    };

    // updates content shown on the page
    this.props.onSubmit(newReview);
    this.setState({ comments: "", user: "", stars: 1 }); // Clears fields after submitting a review
  };

  // Renders the form
  render() {
    return (
      <div className="card card-default mb-3">
        <div className="card-body bg-light">
          <h5 className="card-title">Add Comment</h5>
          <form onSubmit={this.handleSubmit} className="mb-3">
            <div className="mb-3">
              <label htmlFor="user" className="form-label">
                User:
              </label>
              <input
                type="text"
                id="user"
                name="user"
                value={this.state.user}
                onChange={this.handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="stars" className="form-label">
                Stars:
              </label>
              <select
                id="stars"
                name="stars"
                value={this.state.stars}
                onChange={this.handleStarsChange}
                className="form-select"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="comments" className="form-label">
                Comments:
              </label>
              <textarea
                type="text"
                id="comments"
                name="comments"
                value={this.state.comments}
                onChange={this.handleChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Review
            </button>
          </form>
        </div>
      </div>
    );
  }
}
