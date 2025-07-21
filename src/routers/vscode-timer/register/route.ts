import { Router } from "express";
import openDatabase from "../../../database";
import UserService from "../../../services/user";

const router = Router();


router.post("/", async (req, res, next) => {

    const name: string = req.body.name;
    console.log(`register request name: ${name}`)

    if (!name) {
        res.json({
            ok: false,
            user: undefined
        });
        return;
    }
    const db = await openDatabase();
    const userService = new UserService(db);

    const user = await userService.upsert(name);

    console.log(`result upsert request: ${user}`);

    if (!user) {
        res.json({
            ok: false,
            user: undefined
        })
        return;
    }

    res.json({
        ok: true,
        user: user
    })
})



export default router;