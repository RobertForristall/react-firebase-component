import Header from "@/components/Header";
import Login from "@/components/Login";
import Recovery from "@/components/Recovery";
import Signup from "@/components/Signup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { createAuth, type FirebaseConfig } from "@/config/firebase";
import { useState } from "react";

export interface AuthenticationProps {
  appName: string;
  firebaseConfig: FirebaseConfig;
}

const Authentication: React.FC<AuthenticationProps> = ({
  appName,
  firebaseConfig,
}) => {
  const auth = createAuth(firebaseConfig);
  const [currentScreen, setCurrentScreen] = useState<
    "login" | "signup" | "recovery"
  >("login");

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full text-center sm:max-w-md">
        <Header appName={appName} currentScreen={currentScreen} />
        <CardContent>
          {currentScreen == "login" ? (
            <Login />
          ) : currentScreen == "signup" ? (
            <Signup />
          ) : (
            <Recovery />
          )}
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
  );
};

export default Authentication;
