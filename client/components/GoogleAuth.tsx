import { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebaseConfig"; // Your Firebase config file
import { Icons } from "@/components/icons";

const GoogleAuthComponent = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    setIsGoogleLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save the user to Firestore
      handleFirestoreUser(user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Create or update user profile in Firestore
  const handleFirestoreUser = async (user) => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          username: user.displayName,
          email: user.email,
          created_at: Timestamp.now(),
        });
        console.log("User profile created in Firestore");
      } else {
        console.log("User already exists in Firestore");
      }
    } catch (error) {
      console.error("Failed to create or retrieve user profile in Firestore:", error);
    }
  };

  return (
    <div className="flex flex-col place-items-center">
      <button
        type="button"
        className="flex items-center justify-center border-[2px] border-black bg-transparent text-lg font-medium rounded-md py-3 px-6"
        onClick={handleGoogleSignIn}
        disabled={isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-8 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-8 h-4 w-4" />
        )}
        Google
      </button>
    </div>
  );
};

export default GoogleAuthComponent;