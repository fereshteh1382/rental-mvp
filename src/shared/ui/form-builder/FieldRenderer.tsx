import { useFormContext, useFieldArray } from "react-hook-form";
import { FUMButton } from "../fields/button.tsx";
import { Input as FUMInput } from "../fields/input.tsx";
import { FUMAlert } from "../fields/alert.tsx";
import { FUMTextarea } from "../fields/textarea.tsx";
import { FUMDatePickerMiladi } from "../fields/date-picker-miladi.tsx";
import { FUMDatePickerSolar } from "../fields/date-picker-solar.tsx";
import { FUMRadioGroup } from "../fields/radio-group.tsx";
import { FUMSelect } from "../fields/select";
//import { Plus, Trash2 } from "lucide-react";
import type { FieldSchema } from "./types";
import { FileInput as FUMFileInput } from "../fields/file-input.tsx";
import { Password as FumPassword } from "../fields/password.tsx";
import { getButtonHandler } from "../../utils/buttonHandlers";

export function FieldRenderer({ field }: { field: FieldSchema }) {

  const { register, control, watch, setValue, formState: { errors } } = useFormContext();
  const value = watch(field.name);
  const error = errors[field.name]?.message as string | undefined;

  

  if (field.type === "array") {
    const { fields, append, remove } = useFieldArray({ name: field.name, control });
    /*  {console.log(field.items)} */
    return (
      <div dir="rtl" className="space-y-2">
        {field.label && <label className="font-medium">{field.label}</label>}

        <div className="space-y-2">
          {fields.map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex gap-2 items-center">
              {/* چند فیلدی */}

              {Array.isArray(field.items) &&
                field.items.map((subField, subIndex) => (

                  <FieldRenderer
                    key={`${index}-${subIndex}-${subField.name}`}
                    field={{
                      ...subField,
                      name: `${field.name}.${index}.${subField.name}`,
                    }}
                  />
                ))}

              {/* تک فیلدی */}
              {!Array.isArray(field.items) && field.items && (
                <FieldRenderer
                  key={`${item.id}-single`}
                  field={{
                    ...field.items,
                    name: `${field.name}.${index}`,
                  }}
                />
              )}

              {/* دکمه حذف */}
              <FUMButton
                type="button"
                variant="destructive"
                size="icon"
                aria-label="حذف آیتم"
                onClick={() => remove(index)}
                className="transition-all duration-200 hover:scale-110 active:scale-95 group"
              >
                <Trash2 className="w-4 h-4 transition-transform duration-200 group-hover:-rotate-12" />
              </FUMButton>
            </div>
          ))}

          {/* دکمه افزودن */}
          <FUMButton
            type="button"
            size="icon"
            aria-label="افزودن آیتم"
            variant="primary"
            onClick={() => append(Array.isArray(field.items) ? {} : "")}
            className="transition-all duration-200 hover:scale-105 active:scale-95 group"
          >
            <Plus className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" />
          </FUMButton>
        </div>
      </div>
    );
  }

  switch (field.type) {
    case "text":
    case "number":
    case "email":

      return (
        <div dir="rtl" className="space-y-4">

          <FUMInput
            type={field.type}
            label={field.required ? `${field.label} *` : field.label}
            placeholder={field.placeholder}
            {...register(field.name)}
            error={!!error}
            helperText={error || field.description || " "}
          />
        </div>
      );
    case "password":
      return (
        <div dir="rtl" className="space-y-2">

          <FumPassword
            type={field.type}
            id={field.name}
            label={field.required ? `${field.label} *` : field.label}
            placeholder={field.placeholder}
            {...register(field.name)}
            error={!!error}
            helperText={error || field.description || " "}

          />


        </div>
      )

    case "textarea":
      return (
        <FUMTextarea
          field={field}
          value={value}
          onChange={(v) => setValue(field.name, v)}
          error={!!error}
          helperText={error}
        />
      );

    case "select":
      return (
        <FUMSelect
          value={value}
          onChange={(v) => setValue(field.name, v)}
          options={field.options}
          multiple={field.multiple}
          label={field.required ? `${field.label} *` : field.label}
          placeholder={field.placeholder}
          error={!!error}
          helperText={error || field.description}

        />

      );



    case "radio":
      return (
        <FUMRadioGroup
          field={field} // typeScript می‌داند SelectFieldSchema است
          value={value}
          onChange={(v) => setValue(field.name, v)}
          error={!!error}
          helperText={error || field.description}
        />
      );
    case "alert":

      return (
        <FUMAlert
          field={field}

        />
      );
    case "button":

      return (
        <FUMButton
          field={field}
          type={field.ontype}
          label={field.label}
          variant={field.variant}
          color={field.color}
          size={field.size}
          fullWidth={field.fullWidth ?? true}
          onClick={() => {
            const handler = getButtonHandler(field.onClick);
         
            if (handler) handler();
          }}
         
        />

      );


    case "miladidate":
      return (
        <FUMDatePickerMiladi
          field={field}
          value={value ?? null}
          onChange={(v) => setValue(field.name, v)}
          error={!!error}
          helperText={error || field.description || " "}
        />
      );
    case "solardate":
      return (
        <FUMDatePickerSolar
          field={field}
          value={value ?? null}
          onChange={(v) => setValue(field.name, v)}
          error={!!error}
          helperText={error || field.description || " "}
        />
      );

    case "file":
      return (
        <div dir="rtl" className="space-y-2">

          <FUMFileInput
            multiple={field.multiple}
            accept={field.accept}
            maxSizeMB={field.maxSizeMB}
            description={field.description}
            value={watch(field.name) || []}
            onChange={(files) => setValue(field.name, files)}
          />
          {field.description && (
            <p className="text-sm text-muted-foreground">
              {field.description}
            </p>
          )}
          {error && (
            <p className="text-xs text-destructive">
              {error}
            </p>
          )}
        </div>
      )

    default:
      return null;
  }
}
