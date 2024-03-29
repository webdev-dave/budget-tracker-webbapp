import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBudgetCategory, selectCurrentCategories } from "../../budgets/budgetsSlice";
import { deleteTransactionCategory } from "../../transRecords/transRecordsSlice";
const DeleteCategory = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCurrentCategories);
  const [category, setCategory] = useState("");


  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteBudgetCategory({ category: category }));
    dispatch(deleteTransactionCategory({ category: category }));
  };

  return (
    <form
      onSubmit={handleDelete}
      id="delete-category"
      className={`setting`}
    >
      {/* <label htmlFor="delete-cat">Category</label> */}
      <select
        name="category"
        value={category}
        onChange={(e) => setCategory(e.currentTarget.value)}
        required
      >
        <option value="" key="default">
          select category
        </option>
        {categories.map((cat) => (
          <option value={cat} key={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button className="submit">Delete</button>
    </form>
  );
};

export default DeleteCategory;
