import "./ProfileActivity.css";

const ProfileActivity = (userData) => {
  const sect = document.createElement("section");
  sect.classList.add("profile-activity-section");
  sect.classList.add("inactive");

  sect.innerHTML = `
        <h2>Activity</h2>
        <div class="activity-content">
          <div>
            <p><strong>Last time:</strong> ${
              userData.lastLogin || "No data"
            }</p>
            <div>
              <p><strong>To-do's count</strong> ${userData.counts.todos}</p>
              <p><strong>Video's count</strong> ${userData.counts.books}</p>
              <p><strong>Book's count</strong> ${userData.counts.videos}</p>
            </div>   
          </div>
            <div class="activity-todo">
              <h3>To-dos</h3>
                <p><strong>Title:</strong> ${
                  userData.todo.lastTodoTitle || "No data"
                }</p>              
              <p><strong>Date:</strong> ${
                userData.todo.lastTodoActivity || "No data"
              }</p>
            </div>
            <div class="activity-books">
              <h3>Books</h3>
                <p><strong>Title:</strong> ${
                  userData.book.lastBookTitle || "No data"
                }</p>              
              <p><strong>Date:</strong> ${
                userData.book.lastBookActivity || "No data"
              }</p>
            </div>
            <div class="activity-videos">
              <h3>Videos</h3>
              <p><strong>Title:</strong> ${
                userData.video.lastVideoTitle || "No data"
              }</p>              
              <p><strong>Date:</strong> ${
                userData.video.lastVideoActivity || "No data"
              }</p>
            </div>
        </div>
        `;

  return sect;
};
export default ProfileActivity;
