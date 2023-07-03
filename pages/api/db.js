import connect from '../../db/connect';

export default async function handler(req, res) {
    connect();
    res.send("Hello World")
}