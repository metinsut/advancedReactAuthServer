const optionsCors = {
   origin: "*",
   methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
   allowedHeaders: "X-Requested-With,content-type,authorization",
   credentials: true
};

module.exports = optionsCors;
