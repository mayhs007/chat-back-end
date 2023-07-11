const express = require("express")
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server)

app.use(express.static("public"))
io.on("connection", socket => {
  console.log(socket.handshake.address)
  socket.on("chat message", message => {
    io.emit("chat message", message)
  })
  socket.on("disconnect", () => {
    console.log("A user disconnected")
  })
})
const port = 3000
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
