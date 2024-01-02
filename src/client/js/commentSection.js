const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteCommentBtns = document.querySelectorAll(".video__delete-comment");

const addComment = (text, commentId) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = commentId;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";

  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.className = "video__delete-comment";
  span2.innerText = "❌";
  span2.addEventListener("click", handleDeleteComment);

  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};
const deleteComment = (commentId) => {
  const videoComments = document.querySelector(".video__comments ul");
  const deletedComment = document.querySelector(
    'li[data-id="'.concat(commentId, '"]')
  );
  videoComments.removeChild(deletedComment);
};

const handleSubmit = async (event) => {
  event.preventDefault(); // 브라우저가 항상 하는 동작 멈추게 하는 기능 (submit 후 새로고침)

  const textarea = form.querySelector("textarea");
  const videoId = videoContainer.dataset.id;
  const text = textarea.value;

  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleDeleteComment = async (evnet) => {
  const commentId = event.target.parentElement.dataset.id;
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });
  if (response.status === 200) {
    deleteComment(commentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
if (deleteCommentBtns) {
  deleteCommentBtns.forEach(function (deleteBtn) {
    deleteBtn.addEventListener("click", handleDeleteComment);
  });
}
