const swaggerAutogen = require("swagger-autogen")();
const doc = {
  info: {
    title: "Restaurants",
    description: "Rawin's Restaurant",
  },
  host: "restaurant-hykf.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);