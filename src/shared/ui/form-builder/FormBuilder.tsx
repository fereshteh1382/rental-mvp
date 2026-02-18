import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldRenderer } from "./FieldRenderer";
import { buildZodSchema } from "./zodSchema";
import type { Schema } from "./types";
//import { FUMButton } from "../fields/button.tsx"

export function FormBuilder({ schema, onSubmit }: { schema: Schema; onSubmit: (data: any) => void }) {

  const zodSchema = buildZodSchema(schema.fields);
  const methods = useForm({ resolver: zodResolver(zodSchema), defaultValues: {}, mode: "onChange" });
  
  
  return (
    <FormProvider {...methods}>
      <h3 className="text-2xl font-bold mb-4 text-right">
        {schema.title || "فرم"}
      </h3>
      <form onSubmit={methods.handleSubmit(onSubmit)} dir="rtl" className="space-y-4 p-6 bg-white rounded-lg border">
        {schema.fields.map(f => <FieldRenderer key={f.name + f.type} field={f} />

        )}
       
        {/*  <FUMButton
          type="submit"
          label="ثبت"
          fullWidth={false}
          variant="contained"
          color="success"
          size="small"
          
        />  */}


      </form>
    </FormProvider>
  );
}
