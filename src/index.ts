import express from "express";
import VSCodeTimerRouter from "./routers/vscode-timer/route";
import VSCodeTimerRegisterRouter from "./routers/vscode-timer/register/route";

const app = express();
const port = 3040;

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use("/vscode-timer", VSCodeTimerRouter);
app.use("/vscode-timer-register", VSCodeTimerRegisterRouter);

app.listen(port, "localhost", (err) => {
    console.log(`Server running at http://localhost:${port}`)
})