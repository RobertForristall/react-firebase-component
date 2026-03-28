import { createAuth, type FirebaseConfig } from "@/config/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface DashboardProps {
  firebaseConfig: FirebaseConfig;
}

const Dashboard: React.FC<DashboardProps> = ({ firebaseConfig }) => {
  const auth = createAuth(firebaseConfig);

  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // You can manage your app state (e.g., set a global user object in a Context/Redux store)
        console.log("User is signed in:", user.uid);
        setUser(user);
      } else {
        // User is signed out
        console.log("No user is signed in.");
        navigate("/login");
      }
    });
  }, []);
  return <></>;
};

export default Dashboard;
