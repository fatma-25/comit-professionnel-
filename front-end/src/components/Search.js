import React, { Component, Fragment } from "react";

// search bar

export default class Search extends Component {
  //change values
  handleChange = (e) => {
    this.props.searcheditem(e.target.value);
  };

  render() {
    return (
      <Fragment>
        {/* <div> */}
        <div
          className="justify-content-center form-inline mt-5 mb-5"
          style={{ marginLeft: 500, marginRight: 500 }}
        >
          <input
            placeholder="Search"
            className="form-control searchbarStyle"
            type="text"
            onChange={(e) => this.handleChange(e)}
          />
          {/* </div> */}
        </div>
      </Fragment>
    );
  }
}
