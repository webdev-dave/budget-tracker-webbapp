import React from "react";
import { selectSelectedCurrencySymbol } from "../../../../features/settings/settingsSlice";
import { useSelector } from "react-redux";

const TransPrevRemainingFunds = ({ transaction, gridRow, rowClassName }) => {
  const selectedCurrencySymbol = useSelector(selectSelectedCurrencySymbol);

  const gridRowStyle = { "gridRow": `${gridRow} / span 1` };

  return (
    <div className={"prev-remaining-funds grid-child " + rowClassName} style={gridRowStyle}>
      <p className="prev-remaining-funds-text">{selectedCurrencySymbol}0.00</p>
    </div>
  );
};

export default TransPrevRemainingFunds;
