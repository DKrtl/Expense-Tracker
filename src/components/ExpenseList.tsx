import { Expense } from "../type";

interface Props {
  expenses: Expense[];
  onDelete: (index: number) => void;
}

const ExpenseList = ({ expenses, onDelete }: Props) => {
  return (
    expenses.length !== 0 && (
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Amount</th>
              <th scope="col">Category</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>£{expense.amount}</td>
                <td>{expense.category}</td>
                <td>
                  <button
                    onClick={() => onDelete(expense.id)}
                    className="btn btn-outline-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td>Total</td>
              <td>
                {"£" +
                  expenses
                    .reduce((sum, expense) => sum + expense.amount, 0)
                    .toFixed(2)}
              </td>
              <td />
              <td />
            </tr>
          </tbody>
        </table>
      </div>
    )
  );
};

export default ExpenseList;
