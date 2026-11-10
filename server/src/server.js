import app from "./app/app.js";
import connectDB from "./app/config/db.js";

// Connect to MongoDB
await connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

