import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
  FieldContent,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "./ui/input";

interface SignupProps {}

const formSchema = z
  .object({
    email: z.email(),
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
    acceptTerms: z.boolean(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  })
  .superRefine(({ acceptTerms }, ctx) => {
    if (!acceptTerms) {
      ctx.addIssue({
        code: "custom",
        message: "You must agree to the terms and conditions",
        path: ["acceptTerms"],
      });
    }
  });

const Signup: React.FC<SignupProps> = ({}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  function onSubmit(data: z.infer<typeof formSchema>) {}

  return (
    <form id="form-signup" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-signup-email">Email</FieldLabel>
              <Input
                {...field}
                id="form-signup-email"
                aria-invalid={fieldState.invalid}
                placeholder="Enter email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-signup-password">Password</FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  className={cn("hide-password-toggle pr-10")}
                  id="form-signup-password"
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
              <FieldLabel htmlFor="form-signup-confirm-password">
                Confirm Password
              </FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  type={showConfirmPassword ? "text" : "password"}
                  className={cn("hide-password-toggle pr-10")}
                  id="form-signup-confirm-password"
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
          name="acceptTerms"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <Checkbox
                id="terms-checkbox-2"
                name="terms-checkbox-2"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <FieldContent>
                <FieldLabel htmlFor="terms-checkbox-2">
                  Accept terms and conditions
                </FieldLabel>
                <FieldDescription>
                  By clicking this checkbox, you agree to the terms and
                  conditions.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
            </Field>
          )}
        />
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-signup">
            Signup
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default Signup;
