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
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  type ActionCodeSettings,
} from "firebase/auth";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          navigate("/dashboard");
        } else {
          setMessage(
            "User has not verified their account, please verify your account using the email sent when signing up.",
          );
        }
      }
    });
  }, []);

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
            handleFirebaseError(error.code);
          });
      })
      .catch((error) => {
        handleFirebaseError(error.code);
      });
  };

  const loginFunction = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user = res.user;
      })
      .catch((error) => {
        handleFirebaseError(error.code);
      });
  };

  const passwordRecoveryFunction = (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage(
          "An email has been sent to recover your account if an account with the associated email is present.",
        );
      })
      .catch((error) => {
        handleFirebaseError(error.code);
      });
  };

  const handleFirebaseError = (errorCode: string) => {
    console.error(errorCode);
    if (errorCode === "auth/email-already-exists") {
      setMessage("An account with the associated email already exists.");
    }
    if (errorCode === "auth/invalid-email") {
      setMessage(
        "The provided email is invalid, please correct it and attempt to signup again.",
      );
    }
    if (errorCode === "auth/weak-password") {
      setMessage(
        "The provided password is too weak, please correct it with the requirements outlined in the password section.",
      );
    }
    if (errorCode === "auth/too-many-requests") {
      setMessage(
        "Too many requests have been sent concurrently from this device, please wait before attempting your request again.",
      );
    }
    if (errorCode === "auth/network-request-failed") {
      // TODO handle retries for the request before notifying the user there is a network error
      setMessage(
        "There is a network connectivity issue, please check internet connection before attempting your request again.",
      );
    }
    if (errorCode === "auth/user-token-expired") {
      // TODO manage requesting that the user reauthenticates
    }
    if (
      errorCode === "auth/invalid-credential" ||
      errorCode === "auth/user-not-found" ||
      errorCode === "auth/wrong-password"
    ) {
      setMessage(
        "Provided credentials are not valid, please try again or perform an email recovery.",
      );
    }
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
            <Recovery passwordRecoveryFunction={passwordRecoveryFunction} />
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
