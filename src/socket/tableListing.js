import { TableListing } from "../controllers/token/index.js";

export const getLatestTableListing = async (socket) => {
    socket.emit("TableListing", await TableListing());
};