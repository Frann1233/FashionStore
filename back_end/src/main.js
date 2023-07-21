import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import { DEFAULT_PORT } from "./utils/Consts.js";
import brandRoute from "./modules/Brand/Brand.controller.js";
import categoryRoute from "./modules/Category/Category.controller.js";
import colorRoute from "./modules/Color/Color.controller.js";
import materialRoute from "./modules/Material/Material.controller.js";
import productRoute from "./modules/Product/Product.controller.js";
import seasonRoute from "./modules/Season/Season.controller.js";
import sizeRoute from "./modules/Size/Size.controller.js";
import styleRoute from "./modules/Style/Style.controller.js";
import typeRoute from "./modules/Type/Type.controller.js";
import cors from "cors";

export const prisma = new PrismaClient();

const server = express();

server.use(bodyParser.json());
server.use(
  cors({
    origin: "http://localhost:3000",
  })
);

server.use("/brand", brandRoute);
server.use("/category", categoryRoute);
server.use("/color", colorRoute);
server.use("/material", materialRoute);
server.use("/product", productRoute);
server.use("/season", seasonRoute);
server.use("/size", sizeRoute);
server.use("/style", styleRoute);
server.use("/type", typeRoute);

server.listen(DEFAULT_PORT, () => {
  console.log(`Server running on port ${DEFAULT_PORT}`)
})