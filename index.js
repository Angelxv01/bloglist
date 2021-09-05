const http = require("http");
const { PORT } = require("./config");
const app = require("./app");
const logger = require("./server/utils/logger");

const server = http.createServer(app);
server.listen(PORT, () => logger.Info(`Server running on port ${PORT}`));
