// pages/_app.js

import { AuthProvider } from '../context/Authcontext'; // Fix the import statement to match the actual file name
import '../styles/globals.css'; // Ensure you have this file set up with Tailwind

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
