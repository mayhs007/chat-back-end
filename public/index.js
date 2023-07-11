const socket = io()
let yourMessage = ""
document.getElementById("chat-form").addEventListener("submit", e => {
  e.preventDefault()
  const messageInput = document.getElementById("message-input")
  const message = messageInput.value.trim()
  if (message) {
    socket.emit("chat message", message)
    yourMessage = message
    messageInput.value = ""
  }
})

socket.on("connect", () => {
  socket.emit("chat message", "User Joined")
})
socket.on("chat message", message => {
  const div = document.createElement("div")
  if (message === yourMessage) {
    div.id = "chat-my-message"
  } else if (message === "User Joined") {
    div.id = "chat-join-message"
  } else {
    div.id = "chat-other-message"
  }

  div.textContent = message

  document.getElementById("chat-container").appendChild(div)
})
