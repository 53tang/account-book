import React from "react";
import propTypes from "prop-types";

const TotalPrice = ({ income, outcome }) => {
  return (
      <div className="row">
        <div className="col">
          <h5 className="income">收入 : <span>{income}</span></h5>
        </div>
        <div className="col">
          <h5 className="outcome">支出 : <span>{outcome}</span></h5>
        </div>
      </div>
  )
}

TotalPrice.propTypes = {
  inconme: propTypes.number.isRequired,
  outcome: propTypes.number.isRequired,
};

TotalPrice.defaultProps = {
  inconme: 0,
  outcome: 0
};

export default TotalPrice;