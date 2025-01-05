import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [fetchedComment, setFetchedComments] = useState([]);
  const url = "http://localhost:5000";

  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${url}/user/data`, {
        withCredentials: true,
      });
      setUserData(response.data);
    } catch (err) {
      setError(err);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${url}/comment`, {
        withCredentials: true,
      });
      console.log("Fetched comments:", response.data); 
      setFetchedComments(response.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${url}/comment`,
        { comment },
        { withCredentials: true }
      );
      setComment("");
      fetchComments();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/logout", {
        withCredentials: true,
      });
      navigate("/login-page");
      console.log("Logout success");
    } catch (err) {
      console.error("Logout failed:");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

//   useEffect(() => {
//     fetchComments();
//   }, []);

  return (
    <div className="loginContainer">
      <h1>Welcome</h1>
      <h3>Here is your data:</h3>
      {error ? (
        <p>Error: {error.response?.data?.message || "Something went wrong"}</p>
      ) : userData ? (
        <div>
          <pre>Your username is: {JSON.stringify(userData.username)}</pre>
          <pre>Your ID is: {JSON.stringify(userData.id)}</pre>
          {/* <h3>Your Comments:</h3>
          {fetchedComment ? (
            fetchedComment.map((comment, index) => (
              <p key={index}>{comment.content}</p>
            ))
          ) : (
            <p>No comments yet</p>
          )} */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {/* <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write a comment here"
          rows="4"
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <br></br>
        <button type="submit">Submit</button>
      </form>
      <br />*/}
      <button onClick={handleLogout}>Logout</button> 
    </div>
  );
};

export default Dashboard;
