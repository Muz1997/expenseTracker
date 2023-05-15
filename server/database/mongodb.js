import mongoose from "mongoose";

async function connect() {
  await mongoose.connect(
    "mongodb+srv://muzamdty:Zenbook1997@expensetracker.s7kx2gp.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("MongoDB Connection is Successful");
}

export default connect;
