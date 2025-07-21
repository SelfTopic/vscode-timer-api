import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function openDatabase(pathDatabase: string = "database.db") {
    return open({
        driver: sqlite3.Database,
        filename: pathDatabase
    })
}

export default openDatabase;