// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container fadeIn">
      <img src="/images/Food_Logo.jpg" alt="Culinary Compass Logo" className="logo" />
      <h1 className="title">Welcome to Culinary Compass</h1>
      <p className="description">
        Embark on a journey to discover and create mouth-watering recipes from around the globe. Let your culinary adventure begin!
      </p>
      <div>
        <Link href="/login" passHref>
          <button className="button">Login</button>
        </Link>
        <Link href="/register" passHref>
          <button className="button">Register</button>
        </Link>
      </div>
    </div>
  );
}
