import PasswordRecovery from "./PasswordRecovery";
import { Accordion } from "./ui/accordion";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";

interface RecoveryProps {
  passwordRecoveryFunction: (email: string) => void;
}

const Recovery: React.FC<RecoveryProps> = ({ passwordRecoveryFunction }) => {
  return (
    <Accordion type="single" collapsible className="max-w-lg">
      <AccordionItem value="email">
        <AccordionTrigger>Recover Email?</AccordionTrigger>
        <AccordionContent>Here can recover email</AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>Recover Password?</AccordionTrigger>
        <AccordionContent>
          <PasswordRecovery
            passwordRecoveryFunction={passwordRecoveryFunction}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Recovery;
