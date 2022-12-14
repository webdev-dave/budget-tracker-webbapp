import React, { useState } from "react";
import { selectCategories } from "../../features/transRecord/transRecordSlice";
import { useSelector, useDispatch} from "react-redux";
import { deleteCategory } from "../../features/budgets/budgetsSlice";
import { deleteTransactionCategory } from "../../features/transRecord/transRecordSlice";

const DeleteCategory = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories)
  const [category, setCategory] = useState('');

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteCategory({category: category}));
    dispatch(deleteTransactionCategory({category: category}));
  };

  return (
    <form onSubmit={handleDelete}>
      <h3>Delete Category</h3>
      <label htmlFor="delete-cat">Category</label>
      <select
        name=""
        id="delete-cat"
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
      <button>Delete</button>
    </form>
  );
};

export default DeleteCategory;