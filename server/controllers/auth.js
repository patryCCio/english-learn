import { checkCookie } from "./verify.js";
import { db } from "../config/db-config.js";
import jwt from "jsonwebtoken";
import { status500 } from "../config/error.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const cookieName = "englishlearn";


export const getUser = (req, res) => {
    const accessToken = checkCookie(cookieName, req);

    if (accessToken !== null) {
        const info = jwt.decode(accessToken);
        const q = "SELECT * FROM users WHERE id = ?";

        db.query(q, info.id, async (err, result) => {
            if (err) {
                return status500(res);
            }

            return res.status(200).json({
                accessToken,
            });
        });
    } else {
        return res.status(200).json(null);
    }

}

export const register = async (req, res) => {

    const { login, password } = req.body;

    const q =
        "INSERT INTO users (login, password, role) VALUES (?,?,?)";
    const salting = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salting);

    db.query(
        q,
        [login, hash, 0],
        (err, result) => {
            if (err) {
                console.log(err);
                return status500(res);
            }

            return res
                .status(200)
                .json(
                    "Ok!"
                );
        }
    );
}

export const login = (req, res) => {
    const { login, password } = req.body;

    const q = "SELECT * FROM users WHERE login = ?";

    db.query(q, login, async (err, result) => {
        if (err) return res.status(500).json("Błąd przy komunikacji z serwerem!");

        if (await result[0] !== undefined) {
            if (password !== result[0].password) {
                return res.status(409).json("Zły login lub hasło!");
            } else {
                const accessToken = generateAccessToken(result[0]);
                const { password, ...other } = result[0];

                return res
                    .status(200)
                    .cookie(cookieName, "Bearer " + accessToken, {
                        maxAge: 1000 * 60 * 60 * 24,
                        httpOnly: false,
                        secure: true,
                        sameSite: "none"
                    })
                    .json({
                        accessToken,
                    });
            }


        }
    });
};

export const logout = (req, res) => {
    const token = req.body.token;
    if (token.length > 0) {
        return res
            .clearCookie(cookieName, {
                secure: true,
                sameSite: "none",
            })
            .status(200)
            .json("Wylogowano!");
    } else {
        return res.status(404).json("Nie jesteś zalogowany!");
    }
};

const generateAccessToken = (user) => {
    const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET);
    return token;
}
