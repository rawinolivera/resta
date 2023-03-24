const swaggerAutogen = require("swagger-autogen")();
const doc = {
  info: {
    title: "Restaurants",
    description: "Rawin's Restaurant",
  },
  host: "localhost:8000",
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);