import * as dotenv from "dotenv";
dotenv.config();

const DEFAULT_PORT = process.env.PORT;
const DEFAULT_PRODUCT_SKIP = 0;
const DEFAULT_PRODUCT_TAKE = 999;

export {
  DEFAULT_PORT,
  DEFAULT_PRODUCT_SKIP,
  DEFAULT_PRODUCT_TAKE,
};