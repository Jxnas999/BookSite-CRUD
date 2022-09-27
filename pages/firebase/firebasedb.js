import { app } from "./firebase";
import { getFirestore } from "firebase/firestore";

export const firebaseDatabase = getFirestore(app);
