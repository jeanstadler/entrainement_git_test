
import Server from "./core/server.js"

const server = new Server().createServer();

server.listen(process.env.PORT);

