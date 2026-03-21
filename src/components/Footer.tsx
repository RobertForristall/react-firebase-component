import type { CurrentScreen } from "@/pages/Authentication";
import { Button } from "./ui/button";
import { CardFooter } from "./ui/card";
import { Field } from "./ui/field";

interface FooterProps {
  currentScreen: CurrentScreen;
  setCurrentScreen: (newCurrentScreen: CurrentScreen) => void;
}

const Footer: React.FC<FooterProps> = ({ currentScreen, setCurrentScreen }) => {
  const leftButton = (
    <Button
      variant="link"
      id={`form-footer-${currentScreen}-left`}
      onClick={() =>
        setCurrentScreen(currentScreen == "login" ? "signup" : "login")
      }
    >
      {currentScreen == "login" ? "Signup" : "Login"}
    </Button>
  );

  const rightButton = (
    <Button
      variant="link"
      id={`form-footer-${currentScreen}-right`}
      onClick={() =>
        setCurrentScreen(currentScreen == "recovery" ? "signup" : "recovery")
      }
    >
      {currentScreen == "recovery" ? "Signup" : "Recovery"}
    </Button>
  );

  return (
    <CardFooter>
      <Field orientation="horizontal">
        {leftButton}
        {rightButton}
      </Field>
    </CardFooter>
  );
};

export default Footer;
