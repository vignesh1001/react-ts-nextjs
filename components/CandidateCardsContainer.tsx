import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CandidateCards from "../components/CandidateCards";

class CandidateCardsContainer extends Component {
  render() {
    const { candidates } = this.props;
    return (
      candidates && <CandidateCards candidates={candidates} {...this.props} />
    );
  }
}

const mapStateToProps = ({ candidates }) => ({ candidates });
export default connect(mapStateToProps)(CandidateCardsContainer);

CandidateCardsContainer.propTypes = {
  candidates: PropTypes.object.isRequired
};
