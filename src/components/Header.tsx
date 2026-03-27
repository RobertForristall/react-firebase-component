import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { CurrentScreen } from "@/pages/Authentication";

interface HeaderProps {
  appName: string;
  currentScreen: "login" | "signup" | "recovery";
  message: string | undefined;
}

const Header: React.FC<HeaderProps> = ({ appName, currentScreen, message }) => {
  const descriptions: Record<CurrentScreen, string> = {
    login: "Please login using associated account information",
    signup: "Please signup using the requested information",
    recovery: "Please select a credential to recover",
  };

  const messageContent = message ? <div>{message}</div> : <></>;

  return (
    <CardHeader>
      <CardTitle>
        {appName} {currentScreen[0].toUpperCase() + currentScreen.slice(1)}
      </CardTitle>
      <CardDescription>
        <div>{descriptions[currentScreen]}</div>
        {messageContent}
      </CardDescription>
    </CardHeader>
  );
};

export default Header;
