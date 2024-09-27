import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories, Expense } from "../type";

const schema = z.object({
  description: z.string().min(3, "Description must be at least 3 characters."),
  amount: z
    .number({ invalid_type_error: "Amount is required." })
    .positive("Value must be positive."),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required." }),
  }),
});

export type ExpenseFormData = z.infer<typeof schema>;

interface Props {
  submit: (data: ExpenseFormData) => void;
}

const Form = ({ submit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        submit(data), reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Catergory
        </label>
        <select
          {...register("category")}
          id="category"
          className="form-select"
          defaultValue=""
        >
          <option></option>
          {schema.shape.category.options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
