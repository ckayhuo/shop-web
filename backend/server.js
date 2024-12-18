const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const itemsRouter = require("./routes/itemRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const { authMiddleware } = require("./middleware/authMiddleware");
const { getDB } = require("./db");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || /^http:\/\/localhost(:\d+)?$/.test(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


// Routes
app.use("/api/items", itemsRouter);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});










