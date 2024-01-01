const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const handleSubmit = async (event) => {
  event.preventDefault(); // 브라우저가 항상 하는 동작 멈추게 하는 기능 (submit 후 새로고침)

  const textarea = form.querySelector("textarea");
  const videoId = videoContainer.dataset.id;
  const text = textarea.value;

  if (text === "") {
    return;
  }
  await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
};
if (form) {
  form.addEventListener("submit", handleSubmit);
}
