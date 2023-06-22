import express from "express";
import cors from "cors";
import { PORT, REAL_TIME_DATA_IN_SECONDS } from "./src/constants/environment.js";
import routes from "./src/routes/index.js";
import { connectDb } from "./src/constants/db.js";
import http from "http";
import { Server } from "socket.io";
import { getLatestTableListing } from "./src/socket/tableListing.js";
import { TableListing } from "./src/controllers/token/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
connectDb();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

let interval;

io.on("connection", async (socket) => {
    console.log("Socket connected sucessfully");
    socket.on("RefreshTimeAfter", ({ refreshTimeAfter }) => {
        if (interval) clearInterval(interval);
        interval = setInterval(() => getLatestTableListing(socket), refreshTimeAfter);
    })
    socket.emit("InitialTableListing", await TableListing());
    socket.on("disconnect", () => clearInterval(interval));
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
