import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface ResetPasswordProps {
  resetPasswordFunction: (password: string, confirmPassword: string) => void;
}

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

const ResetPassword: React.FC<ResetPasswordProps> = ({
  resetPasswordFunction,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  function onSubmit(data: z.infer<typeof formSchema>) {
    resetPasswordFunction(data.password, data.confirmPassword);
  }
  return (
    <form id="form-reset-password" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-reset-password-password">
                Password
              </FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  className={cn("hide-password-toggle pr-10")}
                  id="form-reset-password-password"
                  placeholder="Password"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeIcon className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>

                {/* hides browsers password toggles */}
                <style>{`
                      .hide-password-toggle::-ms-reveal,
                      .hide-password-toggle::-ms-clear {
                        visibility: hidden;
                        pointer-events: none;
                        display: none;
                      }
                    `}</style>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-reset-password-confirm-password">
                Confirm Password
              </FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  type={showConfirmPassword ? "text" : "password"}
                  className={cn("hide-password-toggle pr-10")}
                  id="form-reset-password-confirm-password"
                  placeholder="Confirm Password"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <EyeIcon className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span className="sr-only">
                    {showConfirmPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>

                {/* hides browsers password toggles */}
                <style>{`
                      .hide-password-toggle::-ms-reveal,
                      .hide-password-toggle::-ms-clear {
                        visibility: hidden;
                        pointer-events: none;
                        display: none;
                      }
                    `}</style>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset Form
          </Button>
          <Button type="submit" form="form-reset-password">
            Reset Password
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default ResetPassword;
