import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuth, signOut } from 'firebase/auth';

const Logout = () => {
    const router = useRouter(); // Next.js router to handle redirection

    useEffect(() => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Sign out successful");
            router.push('/login'); // Redirect to login after sign out
        }).catch((error) => {
            // An error happened.
            console.error("Error signing out: ", error);
            // Optionally, handle errors or redirect on failure
            router.push('/login'); // Redirect to login if error occurs
        });
    }, [router]);

    return (
        <div>
            <p>Signing out...</p> {/* Display a message or a loader */}
        </div>
    );
};

export default Logout;


