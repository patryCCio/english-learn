import jwt from "jsonwebtoken";

export const checkCookie = (name, req) => {
    var cookies = req.headers.cookie;
    if (cookies === undefined) cookies = "";
    var match = cookies.match(RegExp("(?:^|;\\s*)" + name + "=Bearer%20([^;]*)"));
    return match ? match[1] : null;
};

export const verifyAdmin = (req, res, next) => {
    const authHeader = checkCookie("englishlearn", req);

    if (authHeader !== null) {
        jwt.verify(authHeader, process.env.JWT_NORMAL, (err, user) => {
            if (err) {
                return res
                    .status(403)
                    .json("Nie masz uprawnień aby wykonać tą czynność!");
            }

            if (user.role !== 99) {
                return res.status(403).json("Nie masz uprawnień administratora!");
            }

            if (req.user === undefined) {
                req.user = user;
            }

            next();
        });
    } else {
        res.status(401).json("Nie jesteś zalogowany! Zaloguj się ponownie!");
    }
};