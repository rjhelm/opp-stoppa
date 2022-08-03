let users = [];
let admins = [];

const SocketServer = (socket) => {
    // !Connection
    socket.on("joinUser", (id) => {
        users.push({ id, socketId: socket.id });
    });

    socket.on("joinAdmin", (id) => {
        admins.push({ id, socketId: socket.id });
        const admin = admins.find((admin) => admin.id === id);
        let totalActiveUsers = users.length;
        socket.to(`${admin.socketId}`).emit("activeUsers", totalActiveUsers);
    });

    socket.on("disconnect", () => {
        users = users.filter((user) => user.socketId !== socket.id);
        admins = admins.filter((user) => user.socketId !== socket.id);
    });

    // !Like
    socket.on("likePost", (newPost) => {
        let ids = [...newPost.user.followers, newPost.user._id];
        const clients = users.filter((user) => ids.includes(user.id));
        if (clients.length > 0) {
            clients.forEach((client) => {
                socket.to(`${client.socketId}`).emit("unLikeToClient", newPost);
            });
        }
    });

    // !Comment

    // !Follow

    // !Notifications

    // !Messages

}

module.exports = SocketServer;