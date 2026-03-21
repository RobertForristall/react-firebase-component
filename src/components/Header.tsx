import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { CurrentScreen } from "@/pages/Authentication";

interface HeaderProps {
  appName: string;
  currentScreen: "login" | "signup" | "recovery";
}

const Header: React.FC<HeaderProps> = ({ appName, currentScreen }) => {
  const descriptions: Record<CurrentScreen, string> = {
    login: "Please login using associated account information",
    signup: "Please signup using the requested information",
    recovery: "Please select a credential to recover",
  };

  return (
    <CardHeader>
      <CardTitle>
        {appName} {currentScreen[0].toUpperCase() + currentScreen.slice(1)}
      </CardTitle>
      <CardDescription>{descriptions[currentScreen]}</CardDescription>
    </CardHeader>
  );
};

export default Header;
