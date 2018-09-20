

const socket = require('socket.io');
const handle = (...x) => {
    console.log(x)
}
const Model = require('./models')

function detachSocket(client){
    return Promise.all([
        Model.Customer.update({socket : client.id},{$pull : {socket : client.id}}),
        Model.Vendor.update({socket : client.id},{$pull : {socket : client.id}}),
        Model.Visitor.update({socket : client.id},{$pull : {socket : client.id}}),
    ])   
}


function capitalize(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
}

module.exports = (server) => {
    const io = socket(server)

    io.on('connection', function (client) {

        client.on('join', ({asA, id, _id}) => {
            asA = capitalize(asA)
            Model[asA].update({
                $or : [
                    {id},
                    {_id}
                ]
            },{
                $addToSet : {socket : client.id}
            })
        })




        client.on('message', ({info, recipient, recipient_id, session, sender, sender_id}) => {
            console.log('got a message ', {info, recipient, recipient_id, session, sender, sender_id})
            Model.Message.updateOne({id : session},{$push : {messages : {info, recipient : capitalize(recipient), recipient_id, sender : capitalize(sender), sender_id}}})
            .then(() => Model.Message.findOne({id : session}).populate([{path : 'messages.sender_id'},{path : 'messages.recipient_id'}]))
            .then(session => {
                client.broadcast('messages', session)
            })
            .catch(() => {

            })
        })


        client.on('disconnect', function () {
            detachSocket(client)
            .then((data) => {
                console.log('client disconnect...', client.id)
            })
            
            handle()
        })

        client.on('error', function (err) {
            detachSocket(client)
            .then(data => {
                console.log('received error from client:', client.id)
                console.log(err)
            })
        })
    })
}