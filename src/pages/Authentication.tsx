import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Login from "@/components/Login";
import Recovery from "@/components/Recovery";
import Signup from "@/components/Signup";
import { Card, CardContent } from "@/components/ui/card";
import { createAuth, type FirebaseConfig } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useState } from "react";

export type CurrentScreen = "login" | "signup" | "recovery";

export interface AuthenticationProps {
  appName: string;
  firebaseConfig: FirebaseConfig;
}

const Authentication: React.FC<AuthenticationProps> = ({
  appName,
  firebaseConfig,
}) => {
  const auth = createAuth(firebaseConfig);
  const [currentScreen, setCurrentScreen] = useState<CurrentScreen>("login");
  const [message, setMessage] = useState<string | undefined>(undefined);

  const signupFunction = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Successfully created new user:", user.uid);
        sendEmailVerification(user)
          .then((res) => {
            setMessage(
              "User successfully created, please verify your account using the email sent to the provided email.",
            );
          })
          .catch((error) => {
            // TODO: Handle issue if verification email is not properly sent
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error creating user:", errorCode, errorMessage);
        // TODO: Handle issue if user cannot be created
      });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full text-center sm:max-w-md">
        <Header
          appName={appName}
          currentScreen={currentScreen}
          message={message}
        />
        <CardContent>
          {currentScreen == "login" ? (
            <Login />
          ) : currentScreen == "signup" ? (
            <Signup signupFunction={signupFunction} />
          ) : (
            <Recovery />
          )}
        </CardContent>
        <Footer
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
        />
      </Card>
    </div>
  );
};

export default Authentication;
