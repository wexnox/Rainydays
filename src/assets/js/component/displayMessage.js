export default function displayMessage(messageType = "success", message = "") {
  return `<div class="alert ${messageType}">${message}</div>`;
}
