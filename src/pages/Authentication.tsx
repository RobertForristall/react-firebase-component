import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Login from "@/components/Login";
import Recovery from "@/components/Recovery";
import Signup from "@/components/Signup";
import { Card, CardContent } from "@/components/ui/card";
import { createAuth, type FirebaseConfig } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState<CurrentScreen>("login");
  const [message, setMessage] = useState<string | undefined>(undefined);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (user.emailVerified) {
        navigate("/dashboard");
      } else {
        // TODO: Handle non-veerified user
      }
    } else {
      // User is signed out
      console.log("No user is signed in.");
    }
  });

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
            setCurrentScreen("login");
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

  const loginFunction = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user = res.user;
      })
      .catch((error) => {
        // TODO: Handle issue if user could not be logged in
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
            <Login loginFunction={loginFunction} />
          ) : currentScreen == "signup" ? (
            <Signup signupFunction={signupFunction} />
          ) : (
            <Recovery />
          )}
        </CardContent>
        <Footer
          currentScreen={currentScreen}
          setCurrentScreen={(newScreen: CurrentScreen) => {
            setMessage(undefined);
            setCurrentScreen(newScreen);
          }}
        />
      </Card>
    </div>
  );
};

export default Authentication;
