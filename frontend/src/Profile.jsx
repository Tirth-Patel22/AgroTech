import { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(true);

  const userObj  = JSON.parse(localStorage.getItem("user") || "null");
  const username = userObj?.username;

  useEffect(() => {
    if (!username) {
      setError("Please log in to view your profile.");
      setLoading(false);
      return;
    }

    fetch(
      `http://localhost:8000/api/profile/?username=${encodeURIComponent(
        username
      )}`,
      { headers: { "Content-Type": "application/json" } }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setProfile)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [username]);

  // -------------- UI --------------
  if (loading) return <p className="text-center">Loading…</p>;
  if (error)   return <p className="text-red-600 text-center">{error}</p>;
  if (!profile) return null;

  return (
    <div className="profile-card max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
  <Navbar />
  <h2 className="profile-heading text-2xl font-semibold mb-4 text-center">
    {profile.username}&rsquo;s Profile
  </h2>

  <div className="profile-info space-y-3 text-gray-800">
    <div>
      <span className="font-semibold"><b>Username</b>:</span> {profile.username}
    </div>
    <div>
      <span className="font-semibold"><b>Email</b>:</span> {profile.email}
    </div>
  </div>
  <Footer />
</div>
  );
};

export default Profile;
