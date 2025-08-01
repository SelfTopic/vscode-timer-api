import { Router } from "express";
import { VSCodeTimer } from "../../types/vscode.timer";
import openDatabase from "../../database";
import UserService from "../../services/user";

const router = Router();


router.post("/", async (req, res, next) => {
    const body: VSCodeTimer = req.body
    console.log(`router body total seconds: ${body.sessionSeconds}`)

    const db = await openDatabase();

    const userService = new UserService(db);

    if (!body.id || !body.sessionSeconds) {
        res.json({ ok: false })
        return;
    }

    const user = await userService.get(body.name);

    if (!user) {
        res.json({ ok: false })
        return;
    }

    console.log(`user total seconds: ${user.total_seconds}, body seconds: ${body.sessionSeconds}`)
    let resultTotalSeconds = body.sessionSeconds + user.total_seconds;


    console.log(`Call user service update: id: ${user.id}, total seconds: ${resultTotalSeconds}`)
    
    await userService.update(
        user.id,
        resultTotalSeconds
    );


    res.json(
        { ok: true }
    )
    next()
})


router.get("/", async (
    req, 
    res,
    next
) => {

    const db = await openDatabase();

    const userService = new UserService(db);

    const users = await userService.getAll();
    console.log(`request get all: ${users[0].id}`)

    res.json({users})
    next();
})

export default router;