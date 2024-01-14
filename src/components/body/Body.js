import Budgets from "../../features/budgets/Budgets";
import TransRecords from "../../features/transRecords/TransRecords";
import { useSelector } from "react-redux";
import { selectNewTransactionOffsetHeight } from './../../features/newTransaction/newTransactionSlice';

const Body = () => {
  const newTransactionOffsetHeight = useSelector(selectNewTransactionOffsetHeight);
  return (
    <main style={{"marginBottom": `calc(${newTransactionOffsetHeight}px + 2rem)`}}>
      <Budgets />
      <TransRecords />
    </main>
  );
};

export default Body;
