import { useState } from "react";
import ExpenseList from "./components/ExpenseList";
import Form, { ExpenseFormData } from "./components/Form";
import { categories, Expense } from "./type";
import ExpenseFilter from "./components/ExpenseFilter";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSubmit = (data: ExpenseFormData) => {
    setExpenses([...expenses, { ...data, id: expenses.length + 1 }]);
  };

  const handleDelete = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const visibleExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;

  return (
    <>
      <Form submit={handleSubmit} />
      <div className="mb-5"></div>
      <ExpenseFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={(category) => setSelectedCategory(category)}
      />
      <ExpenseList expenses={visibleExpenses} onDelete={handleDelete} />
    </>
  );
}

export default App;
