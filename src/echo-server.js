import { WebSocketServer } from "ws";

let id = 0;
const connMap = new Map();

const wss = new WebSocketServer({ port: 8080 });

console.log('Started server');

const blastClients = (msg) => {
  let i = 0;
  msg = msg.toString();

  console.log(`Sending message to clients: "${msg}"`);
  wss.clients.forEach((client) => { 
    client.send(msg);
  });

  console.log(`Sent to ${i} clients.`);
}

wss.on("connection", function connection(ws, request, client) {
  connMap.set(ws, ++id);
  console.log(`New client: Client #${id}`);
  ws.send(`MSG\nWelcome, Client #${id}!`);
  ws.send(`LUA\ngraphics.title = 'Connected!'`);
  //console.log(`#args: ${arguments.length}`);

  // ws object is for a specific client
  ws.on("message", blastClients);
    //function incoming(message) {
    //blastClients(message);
    //console.log("oh hi: %s", message);
    // TODO: 
    // - implement different message types
    //   - GREET
    //   x SC
    //   x LUA
    //   x MSG
    //   - SYNC
    //     - server: grab epoch before send
    //     - server: send message
    //     - server: grab epoch after send
    //     - client: grab receive epoch on client
    //     - client: send 1
    //     - client: grab post-send epoch on client
    //     - client: send 2
    //     - server: grab epoch after receive
    //     - server: send back to client
    //     - calculate round trip, delays
    // - read from /stonks/ and /sparkles/
    //   - plug into fsevents
    //   - filenames
    //     - something.lua
    //     - something.sc
    //     - something.txt
    // or do something reasonable like headers or wahtever
  //});
});
