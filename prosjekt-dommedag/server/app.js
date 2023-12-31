const express = require("express")
const bcrypt = require("bcrypt")
const mysql = require("mysql2")
const path = require("path")
const crypto = require("crypto")

const app = express()

app.use(express.json())

const dbConnection = mysql.createConnection({
    user: "root",
    password: "123",
    port: 3306,
    database: "dommedag_db",
});

function Encrypt(plainText) {
    return crypto.createHmac("sha256", plainText).update("").digest("hex")
}

const PORT = 8080 

app.listen(PORT, () => {
    console.log("Server started on port", PORT);
    
    app.use(express.static("dist"))

    app.get("/api/courses", (req, res) => {
        dbConnection.connect((err) => {
            if (err) return
            dbConnection.query("SELECT * FROM courses", (err, result) => {
                if (err) return
                res.status(200).json(result)
            })
        })
    })

    app.post("/api/register", async (req, res) => {
        const userCopy = req.body
    
        userCopy.password = await bcrypt.hash(req.body.password, 10)

        console.log(userCopy)

        dbConnection.connect((err) => {
            if (err) {console.error("error", err);res.status(500).json({message: "Feil, prøv igjen senere"});return}
            dbConnection.query("INSERT INTO users (name, mail, password) VALUES (?, ?, ?)", [userCopy.name, userCopy.mail, userCopy.password],(err, result) => {
                if (err) {console.error("error", err);res.status(409).json({message: "Bruker finnes allerede"});return}
                res.status(200).json({message: "Bruker lagt til"})
            })
        })
    })
    
    app.post("/api/login", (req, res) => {
        dbConnection.connect((err) => {
            if (err) {console.error("error", err);res.status(500).json({message: "Feil, prøv igjen senere"});return}
            dbConnection.query("SELECT * FROM users WHERE mail = ?", [req.body.mail], (err, sql) => {
                if (err || sql[0] === undefined) {console.error("error", err);res.status(400).json({message: "Bruker ikke funnet"});return}
                bcrypt.compare(req.body.password, sql[0].password, (err, result) => {
                    if (err) {console.log("error", err);res.status(500).json({message: "Feil, prøv igjen senere"});return}
                    if (result){
                        const token = Encrypt(sql[0].mail)
                        res.cookie("token", token);
                        dbConnection.query("UPDATE users SET token = ? WHERE mail = ?", [token, sql[0].mail], (err) => {
                            if (err) {console.log("error", err);res.status(500).json(err);return}
                            res.status(200).json({message: "Login successful"})
                        })
                    } else if (!result) {
                        res.status(401).json({message: "Feil passord"})
                    }
                })
            })
        })
    })

    app.get("/api/token", (req, res) => {
        if (req.headers.cookie === undefined){res.status(200).json(false);return}

        const cookieValue = req.headers.cookie.split("=")[1]
        dbConnection.connect((err) => {
            if (err) {console.log("error", err);res.status(500).json(err);return}
            dbConnection.query("SELECT token FROM users WHERE token = ?", [cookieValue], (err, sql) => {
                if (err || sql[0] === undefined) {console.log("error", err);res.status(418).json(err);return}
                res.status(200).json(true)
            })
        })
    })

    app.get("/api/join", (req, res) => {
        if (req.headers.cookie === undefined){res.status(200).json(false);return}

        const cookieValue = req.headers.cookie.split("=")[1]
        dbConnection.connect((err) => {
            if (err) {console.log("error", err);res.status(500).json(err);return}
            dbConnection.query("SELECT mail FROM users WHERE token = ?", [cookieValue], (err, userSql) => {
                if (err || userSql[0] === undefined) {console.log("error", err);res.status(418).json(err);return}
                dbConnection.query("SELECT name, mail FROM joined WHERE (name = ?) AND (mail = ?)", [req.query.course, userSql[0].mail], (err, joined) => {
                    if (err || joined.length !== 0) {console.log("error", err);res.status(409).json(err);return}
                    dbConnection.query("INSERT INTO joined (name, mail) VALUES (?, ?)", [req.query.course, userSql[0].mail], (err, courseSql) => {
                        if (err) {console.log("error", err);res.status(418).json(err);return}
                        res.status(200).json(courseSql)
                    })
                })
            })
        })
    })

    app.get("/api/user", (req, res) => {
        if (req.headers.cookie === undefined){res.status(200).json(false);return}

        const cookieValue = req.headers.cookie.split("=")[1]
        dbConnection.connect((err) => {
            if (err) {console.log("error", err);res.status(500).json(err);return}
            dbConnection.query("SELECT name, mail, permissions FROM users WHERE token = ?", [cookieValue], (err, userSql) => {
                if (err || userSql[0] === undefined) {console.log("error", err);res.status(418).json(err);return}
                res.status(200).json(userSql[0])
            })
        })
    })

    app.get("/api/joined", (req, res) => {
        if (req.headers.cookie === undefined){res.status(200).json(false);return}

        const cookieValue = req.headers.cookie.split("=")[1]
        dbConnection.connect((err) => {
            if (err) {console.log("error", err);res.status(500).json(err);return}
            dbConnection.query("SELECT mail FROM users WHERE token = ?", [cookieValue], (err, userSql) => {
                if (err || userSql[0] === undefined) {console.log("error", err);res.status(418).json(err);return}
                dbConnection.query("SELECT * FROM courses WHERE name IN (SELECT name FROM joined WHERE (mail = ?))", [userSql[0].mail], (err, joinedCourse) => {
                    if (err) {console.log("error", err);res.status(418).json(err);return}
                    res.status(200).json(joinedCourse);
                })
            })
        })
    })

    app.get("/api/available", (req, res) => {
        if (req.headers.cookie === undefined){res.status(200).json(false);return}

        const cookieValue = req.headers.cookie.split("=")[1]
        dbConnection.connect((err) => {
            if (err) {console.log("error", err);res.status(500).json(err);return}
            dbConnection.query("SELECT mail FROM users WHERE token = ?", [cookieValue], (err, userSql) => {
                if (err || userSql[0] === undefined) {console.log("error", err);res.status(418).json(err);return}
                dbConnection.query("SELECT * FROM courses WHERE name NOT IN (SELECT name FROM joined WHERE (mail = ?))", [userSql[0].mail], (err, availableCourse) => {
                    if (err) {console.log("error", err);res.status(418).json(err);return}
                    res.status(200).json(availableCourse);
                })
            })
        })
    })

    app.get("/api/joinedusers", (req, res) => {
        if (req.headers.cookie === undefined){res.status(200).json(false);return}

        const cookieValue = req.headers.cookie.split("=")[1]
        dbConnection.connect((err) => {
            if (err) {console.log("error", err);res.status(500).json(err);return}
            
            dbConnection.query("SELECT permissions FROM users WHERE token = ?", [cookieValue], (err, userSql) => {
                if (err || userSql[0] === undefined) {console.log("error", err);res.status(418).json(err);return}
                if (!(userSql[0].permissions >= 1)){console.log("error");res.status(403).json({message: "Permissionlevel too low for this command"})}
                dbConnection.query("SELECT mail FROM joined WHERE (name = ?)", [req.query.course], (err, users) => {
                    if (err || users[0] === undefined) {console.log("error", err);res.status(418).json(err);return}
                    res.status(200).json(users)
                })
            })
        })
    })
})