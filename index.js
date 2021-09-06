const http = require("http");
const { PORT } = require("./config");
const app = require("./app");
const logger = require("./server/utils/logger");

const port = PORT || 5000;

const server = http.createServer(app);
server.listen(port, () => logger.Info(`Server running on port ${PORT}`));
