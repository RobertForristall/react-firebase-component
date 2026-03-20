import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { createAuth, type FirebaseConfig } from "@/config/firebase"

const formSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
})

export interface LoginProps {
  appName: string
  firebaseConfig: FirebaseConfig
}

const Login: React.FC<LoginProps> = ({ appName, firebaseConfig }) => {
  const auth = createAuth(firebaseConfig)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {}

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full text-center sm:max-w-md">
        <CardHeader>
          <CardTitle>{appName} Login</CardTitle>
          <CardDescription>
            Please login using associated account information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-login-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="form-login-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter email"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-login-password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      id="form-login-password"
                      placeholder="Password"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field orientation="horizontal">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
                <Button type="submit" form="form-login">
                  Login
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button variant="link" id="form-login-signup">
              Signup
            </Button>
            <Button variant="link" id="form-login-forgot">
              Forgot
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
