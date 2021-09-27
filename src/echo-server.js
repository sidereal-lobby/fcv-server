import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

console.log('started %s', 1)

wss.on("connection", function connection(ws, request, client) {
  console.log(`#args: ${arguments.length}`);

  // WebSocket
  //console.log(
  //  `connection:`, Object.keys(ws), 
  //  `sender: `, Object.keys(ws._sender),
  //  `receiver: `, Object.keys(ws._receiver)
  //);

  // request
  //console.log(`request:`, Object.keys(request));

  // client
  //console.log(`client:`, client);


  // ws object is for a specific client
  ws.on("message", function incoming(message) {
    //console.log("oh hi: %s", message);
    // TODO: 
    // - implement different message types
    //   - GREET
    //   - SC
    //   - LUA
    //   - MESSAGE
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
    let i = 0;
    //const msg = `did someone say "${message.toString()}"? neat!`;
    const msg = message.toString();

    console.log(`sending message to clients: "${msg}"`);
    wss.clients.forEach((client) => { 
      //console.log(`client #${i}: `, Object.keys(client));
      //client.send(`hi client ${++i}! ${msg}`);
      client.send(msg);
    });
    console.log(`# clients: ` + i);
    //console.log(`clients: `, );
  });
});
