

const socket = require('socket.io');
const handle = (...x) => {
    console.log(x)
}


module.exports = (server) => {
    const io = socketio(server)

    io.on('connection', function (client) {
        client.on('register', handle)//tag information upon resitration

        client.on('join', handle)

        client.on('leave', handle)

        client.on('message', handle)


        client.on('disconnect', function () {
            console.log('client disconnect...', client.id)
            handle()
        })

        client.on('error', function (err) {
            console.log('received error from client:', client.id)
            console.log(err)
        })
    })
}