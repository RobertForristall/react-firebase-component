import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PasswordRecoveryProps {
  passwordRecoveryFunction: (email: string) => void;
}

const formSchema = z.object({
  email: z.email(),
});

const PasswordRecovery: React.FC<PasswordRecoveryProps> = ({
  passwordRecoveryFunction,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    passwordRecoveryFunction(data.email);
  }

  return (
    <form id="form-password-recovery" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-password-recovery-email">
                Email
              </FieldLabel>
              <Input
                {...field}
                id="form-password-recovery-email"
                aria-invalid={fieldState.invalid}
                placeholder="Enter email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-password-recovery">
            Send Recovery
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default PasswordRecovery;
