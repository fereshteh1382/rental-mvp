import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemSchema, ItemSchema } from "../../validations/itemSchema";
import { Button, Input, Textarea, Checkbox, Stack } from "@mui/joy";

export function AddItemForm() {
  const { register, handleSubmit } = useForm<ItemSchema>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      available: true,
    },
  });

  const onSubmit = (values: ItemSchema) => {
    console.log("📦 Item Added:", values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Input placeholder="عنوان کالا" {...register("title")} />
        <Textarea placeholder="توضیحات" {...register("description")} />
        <Input
          type="number"
          placeholder="قیمت"
          {...register("price", { valueAsNumber: true })}
        />
        <Checkbox label="موجود است" {...register("available")} />
        <Button type="submit">ثبت کالا</Button>
      </Stack>
    </form>
  );
}
