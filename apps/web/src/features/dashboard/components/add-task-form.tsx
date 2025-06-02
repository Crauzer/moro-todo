import { useForm } from "react-hook-form";
import { Button } from "~/components";
import { Form } from "~/components/form";

export type AddTaskFormProps = {
  onSubmit: (data: AddTaskFormData) => void;
};

export type AddTaskFormData = {
  text: string;
};

export const AddTaskForm = ({ onSubmit }: AddTaskFormProps) => {
  const form = useForm<AddTaskFormData>({
    defaultValues: {
      text: "",
    },
    resetOptions: {
      keepValues: false,
    },
  });

  const { control, watch } = form;
  const text = watch("text");

  const handleSubmit = (data: AddTaskFormData) => {
    onSubmit(data);
    form.reset();
    form.setFocus("text");
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex flex-row gap-2 w-full items-center"
    >
      <Form.TextField
        name="text"
        control={control}
        className="flex-1"
        placeholder="Add a new task..."
        required
      />
      <Button type="submit" disabled={!text?.trim()} className="min-w-[80px]">
        Add
      </Button>
    </form>
  );
};
