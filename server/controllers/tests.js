import { db } from "../config/db-config.js";
import { status500 } from "../config/error.js";
import jwt from "jsonwebtoken";


export const getTests = (req, res) => {
    const { accessToken } = req.body;

    const decode = jwt.decode(accessToken);

    const q = "SELECT * FROM tests WHERE userId = ?";

    db.query(q, [decode.id], (err, result) => {
        if (err) return status500(res);

        let names = [];


        for (let x = 0; x < result.length; x++) {
            let state = false;
            for (let y = 0; y < names.length; y++) {
                if (names[y].name === result[x].name) {
                    state = true;
                }
            }

            if (!state) {
                names.push({
                    name: result[x].name,
                    type: result[x].type,
                    fill: result[x].fill,
                    state: result[x].state,
                    data: []
                });
            }
        }

        for (let x = 0; x < names.length; x++) {
            for (let y = 0; y < result.length; y++) {
                if (names[x].name === result[y].name) {
                    names[x].data.push(result[y]);
                }
            }
        }
        return res.status(200).json({ names });
    })

}

export const deleteItem = (req, res) => {
    const { id, userId } = req.body;

    const q = "DELETE FROM tests WHERE id = ? and userId = ?";

    db.query(q, [id, userId], (err, result) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json("Ok!");
    })
}

export const addItem = (req, res) => {
    const { userId, name, state, fill, type, object } = req.body;

    const q = "INSERT INTO tests (userId, name, state, fill, type, pl, plopposite, en, en2, en3, enopposite) VALUES (?,?,?,?,?,?,?,?,?,?,?)";

    let array = [userId, name, state, fill, type, object.pl, object.plopposite, object.en, object.en2, object.en3, object.enopposite];


    db.query(q, array, (err, result) => {
        if (err) { console.log(err); return res.status(500).json(err); }

        const id = result.insertId;
        console.log(id);
        return res.status(200).json(id);
    })


}

export const deleteAllItems = (req, res) => {


    const { name, userId } = req.body;

    const q = "DELETE FROM tests WHERE name = ? AND userId = ?";

    db.query(q, [name, userId], (err, result) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json("Ok!");
    })
}


export const editNameCatalog = (req, res) => {
    const { newName, oldName, userId } = req.body;

    const q = "UPDATE tests SET name = ? WHERE userId = ? AND name = ?";

    db.query(q, [newName, userId, oldName], (err, result) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json("Ok!");
    })
}

export const addNewCatalog = (req, res) => {
    const { array } = req.body;

    const q = "INSERT INTO tests (userId, name, fill, state, type, pl, en, en2, en3, plopposite, enopposite) VALUES ?";

    db.query(q, [array], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(result.insertId);
    })

}

export const updateOptions = (req, res) => {
    const { options, userId, name } = req.body;

    const q = "UPDATE tests SET state = ?, fill = ? WHERE userId = ? AND name = ?";

    db.query(q, [options.state, options.fill, userId, name], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(result);
    })
}
