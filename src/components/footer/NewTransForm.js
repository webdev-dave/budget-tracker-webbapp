import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction
} from "../../features/transRecord/transRecordSlice";
import { v4 as uuidv4 } from "uuid";
import {
  createPopUpOnZeroValueSubmit,
  handleInputChangeForCustomNumberInputField,
} from "../../utilities/helpers/helperFunctions/formHelpers";
import { developmentModeSettings } from "../../utilities/helpers/helperObjects";
import { selectCurrentCategories } from "../../features/budgets/budgetsSlice";

const NewTransForm = ({ isExpanded }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCurrentCategories);
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [preventSubmit, setPreventSubmit] = useState(true);

  const resetForm = () => {
    setCategory(categories[0]);
    setDescription("");
    setAmount("");
    setPreventSubmit(true);
  };

  /* clears old category values after deletion of a category 
  to avoid a scenario where old category value is still selected.*/
  useEffect(() => {
    setCategory(categories[0]);
  }, [categories]);

  useEffect(() => {
    //if was open, then reset form to default on close
    if (!isExpanded) {
      resetForm();
    }
  });

  const handleAmountValueChange = (e) => {
    handleInputChangeForCustomNumberInputField(e, setAmount, setPreventSubmit);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amountDomInputElement = e.currentTarget.querySelector("input#amount");
    if (preventSubmit) {
      //prevent submission of zero/blank value
      createPopUpOnZeroValueSubmit(amountDomInputElement);
      return;
    }

    dispatch(
      addTransaction({
        type: "expense",
        category: category,
        description: description ? description : "expense",
        amount: Number(amount),
        id: uuidv4(),
      })
    );
    resetForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`new-trans-form ${isExpanded ? "open" : ""}`}
    >
      <div className="new-trans-select">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.currentTarget.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="new-trans-desc">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          type="text"
        />
      </div>

      <div className="new-trans-amount">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          value={amount}
          onChange={handleAmountValueChange}
          type="text"
          autoComplete={developmentModeSettings.autocomplete}
        />
      </div>
      <button className={`submit-btn ${preventSubmit ? "prevent" : "allow"}`}>
        Add Transaction
      </button>
    </form>
  );
};

export default NewTransForm;
