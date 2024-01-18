import React from "react";
import { useSelector } from "react-redux";
import { selectSelectedCurrencySymbol } from "../../../../features/settings/settingsSlice";
import { removeMinusSymbol } from "../../../../utilities/helpers/helperFunctions/otherHelpers";


const TransDescription = ({ transaction }) => {
  const selectedCurrencySymbol = useSelector(selectSelectedCurrencySymbol);
  const formattedAmount = `${selectedCurrencySymbol}${removeMinusSymbol(
    transaction.amount.toFixed(2)
  )}`;
  let descriptionJsx;
  const amountJSXClassName = `amount-${
    transaction.type === "expense"
      ? "expense"
      : transaction.amount > 0
      ? "positive"
      : "negative"
  }`;
  const amountJSX = (
    <span className={amountJSXClassName}>{formattedAmount}</span>
  );

  //Note: new expense transactions can only be positive (form prevents negative expense submissions)
  if (transaction.type === "expense") {
    descriptionJsx = (
      <span>
        expense of &nbsp;{amountJSX}&nbsp; added to {transaction.category}
      </span>
    );
  } else if (transaction.type === "budget" && transaction.amount > 0) {
    descriptionJsx = (
      <span>
        balance of &nbsp;{amountJSX}&nbsp; added to {transaction.category}
      </span>
    );
  } else if (transaction.type === "budget" && transaction.amount < 0) {
    descriptionJsx = (
      <span>
        balance of &nbsp;{amountJSX}&nbsp; removed from {transaction.category}
      </span>
    );
  }

  return (
    <td className="description">{descriptionJsx}</td>
  )
};

export default TransDescription;
