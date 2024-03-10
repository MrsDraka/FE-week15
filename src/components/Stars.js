import React from "react";

export default class Stars extends React.Component {
  //iterates through the stars to be displayed
  renderStars(numStars) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i
          key={i}
          className={`bi ${
            i < numStars
              ? "bi-star-fill text-warning"
              : "bi-star text-secondary"
          }`}
        ></i>
      );
    }
    return stars;
  }

  //Displays the number of stars depending on the number given by the user using the function above
  render() {
    const { value } = this.props;
    return <div>{this.renderStars(value)}</div>;
  }
}
