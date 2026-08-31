const express = require("express");
const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./users.db");

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL
    )
`);

app.post("/register", async (req, res) => {
    const { userId, password } = req.body;

    if (!userId || !password) {
        return res.status(400).json({
            message: "아이디와 비밀번호를 입력해주세요."
        });
    }

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        db.run(
            `
            INSERT INTO users (user_id, password_hash)
            VALUES (?, ?)
            `,
            [userId, passwordHash],

            function (error) {
                if (error) {
                    if (error.message.includes("UNIQUE")) {
                        return res.status(409).json({
                            message: "이미 존재하는 아이디입니다."
                        });
                    }

                    return res.status(500).json({
                        message: "계정 저장 중 오류가 발생했습니다."
                    });
                }

                res.json({
                    message: "계정 저장 성공",
                    userId: userId
                });
            }
        );

    } catch (error) {
        res.status(500).json({
            message: "서버 오류가 발생했습니다."
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
