const server = require('http').createServer()

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

const PORT = 3000

server.listen(PORT)

console.log(`server listening on PORT ${PORT}.....`);

let readyPlayers = 0
io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    socket.on('ready', () => {
        readyPlayers++

        if (readyPlayers === 2) {
            io.emit('startGame', socket.id)
        }
    })
})
