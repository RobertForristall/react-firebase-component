import { createAuth, type FirebaseConfig } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";

interface DashboardProps {
  firebaseConfig: FirebaseConfig;
}

const Dashboard: React.FC<DashboardProps> = ({ firebaseConfig }) => {
  const auth = createAuth(firebaseConfig);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // You can manage your app state (e.g., set a global user object in a Context/Redux store)
      console.log("User is signed in:", user.uid);
    } else {
      // User is signed out
      console.log("No user is signed in.");
    }
  });
  return <></>;
};

export default Dashboard;
