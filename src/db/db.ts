import Knex from "knex"; // Import Knex from 'knex'

import knexConfig from "./knexfile"; // Import knexConfig directly

const environment = process.env.NODE_ENV || "development";
const config = knexConfig[environment]; // Use the configuration object directly

const knex = Knex(config);

export default knex;
