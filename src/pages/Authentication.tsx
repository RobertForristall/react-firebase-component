import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Login from "@/components/Login";
import Recovery from "@/components/Recovery";
import Signup from "@/components/Signup";
import { Card, CardContent } from "@/components/ui/card";
import { createAuth, type FirebaseConfig } from "@/config/firebase";
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
        <Footer
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
        />
      </Card>
    </div>
  );
};

export default Authentication;
