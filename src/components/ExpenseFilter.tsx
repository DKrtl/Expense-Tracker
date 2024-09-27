interface Props {
  categories: readonly string[];
  selectedCategory: string;
  onSelect: (value: string) => void;
}

const ExpenseFilter = ({ categories, selectedCategory, onSelect }: Props) => {
  return (
    <div className="mb-3">
      <select
        id="categoryFilter"
        className="form-select"
        value={selectedCategory}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExpenseFilter;
