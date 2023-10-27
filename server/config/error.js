export const status500 = (res) => {
    return res.status(500).json("Błąd w komunikacji z serwerem!");
}