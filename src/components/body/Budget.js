import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBudgetBalanceEntry } from "../../features/budgets/budgetsSlice";
import { selectTransactions } from "../../features/transRecord/transRecordSlice";
import { v4 as uuidv4 } from "uuid";

const Budget = ({ budget }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(budget.amount);
  const transactions = useSelector(selectTransactions);
  const budgetRef = useRef();
  const budgetCategoryCreatedByUser = !budget.isDefaultCategory; 

  //when a user creates a new category, this effect auto scrolls to that new budget category
  useEffect(()=>{
    if(budgetCategoryCreatedByUser && budgetRef.current ){
      budgetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  },[budgetCategoryCreatedByUser]);

  const handleUpdate = (e) => {
    e.preventDefault();

    dispatch(
      addBudgetBalanceEntry({
        category: budget.category,
        type: "budget",
        description: `added balance to ${budget.category} budget`,
        amount: Number(amount),
        id: uuidv4(),
      })
    );
    setAmount(0);
  };

  const calculateTotalExpenses = () => {
    return transactions[budget.category]
      .map((transaction) => transaction.amount)
      .reduce((acc, currentValue) => acc + currentValue, 0);
  };

  const getFundsRemainingClassName = (amount) => {
    if (parseFloat(amount) === 0) {
      return null;
    } else if (parseFloat(amount) > 0) {
      return "positive";
    } else if (parseFloat(amount) < 0) {
      return "negative";
    }
  };

  const remainingFunds = Number.parseFloat(
    budget.amount - calculateTotalExpenses()
  ).toFixed(2);
  const fundsRemainingClassName = getFundsRemainingClassName(remainingFunds);

  return (
    <li className="budget-container" id={budget.category} ref={budgetRef}>
      <div className="data-wrapper">
        <div className="category-label">Category</div>
        <h3 className="category-value">{budget.category}</h3>
        <h4 className={`remaining-funds ${fundsRemainingClassName}`}>
          Funds Remaining: {remainingFunds}
        </h4>
      </div>

      <form onSubmit={handleUpdate} className="budget-form">
        <input
          className="amount-input"
          name="budget-sum"
          value={amount}
          onChange={(e) => setAmount(e.currentTarget.value)}
          type="number"
          step="10"
        />
        <button className="update-button">Update</button>
      </form>
    </li>
  );
};

export default Budget;
