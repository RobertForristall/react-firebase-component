import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

export interface FirebaseConfig {
  apiKey: string | undefined
  authDomain: string | undefined
  projectId: string | undefined
  storageBucket: string | undefined
  messagingSenderId: string | undefined
  appId: string | undefined
  measurementId: string | undefined
}

export const createAuth = (firebaseConfig: FirebaseConfig) => {
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  return auth
}
