import { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";

const GoogleAuthComponent = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    setIsGoogleLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      handleFirestoreUser(user);

      router.push("/dashboard");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleFirestoreUser = async (user: User) => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          username: user.displayName,
          email: user.email,
          photoURL: user.photoURL || null,
          created_at: Timestamp.now(),
        });
        console.log("User profile created in Firestore");
      } else {
        const userData = userDoc.data();
        if (userData.username !== user.displayName || userData.email !== user.email) {
          await setDoc(userDocRef, {
            username: user.displayName,
            email: user.email,
            updated_at: Timestamp.now(),
          }, { merge: true });
          console.log("User profile updated in Firestore");
        } else {
          console.log("User already exists in Firestore with the same info");
        }
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