import React, { useState, useEffect } from "react";
import "./commu.css"; // Import styles

const CommunityResources = () => {
  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState(null); // To show conversations
  const [newComment, setNewComment] = useState("");
  const [newPostImage, setNewPostImage] = useState("");
  const [newPostCaption, setNewPostCaption] = useState("");
  const [showPostModal, setShowPostModal] = useState(false);

  // List of usernames for random selection
  const usernames = ["User1", "User2", "User3", "User4", "User5"];

  // Simulated API call to fetch posts
  useEffect(() => {
    fetchPosts();
  }, []);
  const like = () => {
    const audio = new Audio("like.mp3");
    audio.play();
  };
  const add = () => {
    const audio = new Audio("add (2).mp3");
    audio.play();
  };
  const fetchPosts = () => {
    // Simulating data fetching
    const simulatedPosts = [
      {
        _id: "1",
        type: "image",
        content: "post.jpeg", // Sample image URL
        caption: "New beginnings!!",
        comments: [
          { user: "User1", text: "Wow, stunning!" },
          { user: "User2", text: "Great!!" },
        ],
        likes: 20,
        shares: 5,
        comment: 0,
      },
      {
        _id: "2",
        type: "image",
        content: "post2.jpeg", // Sample image URL
        caption: "Result of hard work and progress!!",
        comments: [
          { user: "User3", text: "Great lol!" },
          { user: "User4", text: "You made it brothaa!" },
        ],
        likes: 20,
        shares: 5,
      },
    ];
    setPosts(simulatedPosts); // Set posts with simulated data
  };

  const handleCommentSubmit = (postId) => {
    if (!newComment.trim()) return;

    // Simulate adding a comment
    const updatedPosts = posts.map((post) => {
      if (post._id === postId) {
        return {
          ...post,
          comments: [...post.comments, { user: "NewUser", text: newComment }],
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    setNewComment(""); // Clear the comment input
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post._id === postId) {
        return {
          ...post,
          likes: post.likes + 1,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleShare = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post._id === postId) {
        return {
          ...post,
          shares: post.shares + 1,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };
  
  const handlePostSubmit = () => {
    if (!newPostImage || !newPostCaption.trim()) return;

    // Randomly select a username
    const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];

    // Simulating adding a new post
    const newPost = {
      _id: Date.now().toString(),
      type: "image",
      content: newPostImage,
      caption: newPostCaption,
      comments: [],
      likes: 0,
      shares: 0,
      username: randomUsername, // Assign the random username
    };

    setPosts([newPost, ...posts]); // Add the new post to the beginning
    setNewPostImage(""); // Clear the image input
    setNewPostCaption(""); // Clear the caption input
    setShowPostModal(false); // Close the modal
  };

  return (
    <div className="community-container">
      <h2>Community Resources</h2>

      {/* Posts Section */}
      <div className="posts-section">
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            {/* Display random username above post image */}
            <div className="post-username">{post.username}</div>

            {/* Display image and caption */}
            <img src={post.content} alt="Post" className="post-image" />
            <p className="post-caption">{post.caption}</p>

            {/* Like and Share */}
            <div className="like-share">
            
            <button
  onClick={() => {
    like(); // Play the like sound
    handleLike(post._id); // Handle like functionality
  }}
  className="like-btn"
>
  ❤ ({post.likes})
</button>

              <button
                onClick={() => handleShare(post._id)}
                className="share-btn"
              >
                ➤ ({post.shares})
              </button>
              <button
              onClick={() =>
                setActivePost(activePost === post._id ? null : post._id)
              }
              className="toggle-conversation-btn"
            >
              {activePost === post._id ? "Hide Conversation" : "💬"} 
            </button>
            </div>

            {/* Show conversation */}
            

            {activePost === post._id && (
              <div className="conversation-section">
                <h4>Comments</h4>
                {post.comments.map((comment, index) => (
                  <div key={index} className="comment-item">
                    <strong>{comment.user}:</strong> {comment.text}
                  </div>
                ))}
                <div className="add-comment-section">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                    className="comment-input"
                  />
                  <button
                    onClick={() => handleCommentSubmit(post._id)}
                    className="comment-submit-btn"
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Floating Button to Add Post */}
      <button
        onClick={() =>{
          add(); // Play the add sound
           setShowPostModal(true);}}
        className="add-post-btn"
      >
        +
      </button>

      {/* Popup Modal for Adding a Post */}
      {showPostModal && (
        <div className="post-modal">
          <div className="modal-content">
            <h3>Create a New Post</h3>
            <input
              type="text"
              value={newPostCaption}
              onChange={(e) => setNewPostCaption(e.target.value)}
              placeholder="Enter caption"
              className="new-post-caption"
            />
            <input
              type="url"
              value={newPostImage}
              onChange={(e) => setNewPostImage(e.target.value)}
              placeholder="Enter image URL"
              className="new-post-image"
            />
            <div className="modal-actions">
            <button
                onClick={() => {
                  like(); // Play the like sound
                  handlePostSubmit(); // Handle the post submission
                }}
                className="post-submit-btn"
              >
                Post
              </button>
              <button
                onClick={() => setShowPostModal(false)}
                className="close-modal-btn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityResources;
