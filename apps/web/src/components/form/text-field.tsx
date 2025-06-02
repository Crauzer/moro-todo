import type { HTMLInputTypeAttribute } from "react";
import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Input } from "~/components/input";

export type TextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
};

export const TextField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  placeholder,
  description,
  className,
  inputClassName,
  disabled = false,
  required = false,
  type = "text",
}: TextFieldProps<TFieldValues, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const hasError = !!error;

  return (
    <div className={twMerge("space-y-2", className)}>
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-foreground flex items-center gap-1"
        >
          {label}
          {required && <span className="text-red-400">*</span>}
        </label>
      )}

      <Input
        {...field}
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={twMerge(
          "backdrop-blur-sm bg-white/10 border-white/20",
          hasError && "border-red-400/50 focus-visible:ring-red-400",
          disabled && "opacity-50 cursor-not-allowed",
          inputClassName
        )}
      />

      {description && !hasError && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      {hasError && (
        <p className="text-xs text-red-400" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
};
