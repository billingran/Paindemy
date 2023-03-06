const mongoose = require("mongoose");

//Connect to mongodb alts
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MYDBCODE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to mongodb atlas.");
  })
  .catch((err) => {
    console.log(err);
  });
