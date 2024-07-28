"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const simpleController_1 = require("./controllers/simpleController");
const app = (0, routing_controllers_1.createExpressServer)({
    controllers: [simpleController_1.SimpleController]
});
const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
// import express, { Request, Response } from "express";
// const app = express();
// const port = 3000;
// app.get("/", (req: Request, res: Response) => {
//     res.send("Hello World!");
// });
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// });
