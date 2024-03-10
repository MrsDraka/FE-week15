import React from "react";

export default class EditReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: props.comments,
      stars: props.stars,
      id: props.id,
    };
  }

  //updates changes
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //submits edited data
  handleSubmit = (event) => {
    event.preventDefault();
    const { comments, stars, id } = this.state;
    this.props.onEdit({ comments, stars }, id);
  };

  //displays the edit review form in each review
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="comments" className="form-label">
            Comments:
          </label>
          <textarea
            id="comments"
            name="comments"
            value={this.state.comments}
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
            onChange={this.handleChange}
            className="form-select"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    );
  }
}
