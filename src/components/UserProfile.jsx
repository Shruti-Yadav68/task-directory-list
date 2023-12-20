import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Clock from "./Clock";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [clockPaused, setClockPaused] = useState(false);
  const [posts, setPosts] = useState();
  const [singleUserPost, setSingleUserPost] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(
    "America/Argentina/Salta"
  );

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      setUser(response?.data);
    };

    fetchUser();

    const fetchPosts = async () => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`
      );
      setPosts(response?.data);
    };

    fetchPosts();

    const fetchCountries = async () => {
      const response = await axios.get("http://worldtimeapi.org/api/timezone");
      setCountries(response.data);
    };

    fetchCountries();
  }, [id]);

  useEffect(() => {
    const data = posts?.filter((post) => post?.userId == id);
    setSingleUserPost(data);
  }, [id, posts]);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const toggleClock = () => {
    setClockPaused((prevPaused) => !prevPaused);
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      !document.querySelector(".popup-content").contains(e.target)
    ) {
      setShowPopup(false);
    }
  };
  return (
    <>
      <div className={`profileSection ${showPopup ? "blur" : ""}`}>
        <div className="topSection">
          <Link className="backButton" to="/">
            Back
          </Link>
          <div className="timerDiv">
            <div>
              <select
                className="selectCountry"
                value={selectedCountry}
                onChange={handleCountryChange}
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Clock paused={clockPaused} selectedCountry={selectedCountry} />
            </div>
            <div className="timerButton" onClick={toggleClock}>
              {clockPaused ? "Start" : "Pause"}
            </div>
          </div>
        </div>
        <div className="profile">Profile</div>
        <div className="userSection">
          <div className="nameSection">
            <div>{`Name: ${user?.name}`}</div>
            <div>{`Address: ${user?.address?.suite}, ${user?.address?.street}, ${user?.address?.city}`}</div>
          </div>
          <div className="usernameSection">
            <div>{`Username | ${user?.username}`}</div>
            <div>{`Email: ${user?.email} | Phone: ${user?.phone}`}</div>
          </div>
          <div className="postSection">
            <div className="postSection">
              {singleUserPost &&
                singleUserPost?.length > 0 &&
                singleUserPost?.map((post) => {
                  return (
                    <div
                      key={post.id}
                      className="singlePost"
                      onClick={() => handlePostClick(post)}
                    >
                      <div className="postTitle">{`Post Title: ${post?.title}`}</div>
                      <div>{`Content: ${post?.body.substring(0, 50)}...`}</div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      {showPopup && <div className="backdrop" onClick={handleClosePopup}></div>}

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-btn" onClick={handleClosePopup}>
              &times;
            </span>
            <div className="popup-title">{`Post Title: ${selectedPost?.title}`}</div>
            <div>{`Content: ${selectedPost?.body}`}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
