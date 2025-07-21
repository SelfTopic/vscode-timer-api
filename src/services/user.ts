import openDatabase from "../database";
import User from "../database/models/user";


class UserService {

    db: Awaited<ReturnType<typeof openDatabase>> | null = null;
    
    constructor(database: Awaited<ReturnType<typeof openDatabase>>) {
        this.db = database;
    }
    
    async get(name: string) {
        const user = await this.db?.get<User>(
            `SELECT * FROM users WHERE name = ?`,
            name
        )

        if (user) {
            user.total_seconds = user.total_seconds || 0;
        };
        
        return user;
    }

    async upsert(name: string) {

        if (!this.db) throw new Error("Database is not initialized");

        const user = await this.get(name);

        if (user) {
            return user;
        }
        
        const fetch = await this.db?.run(
            `INSERT INTO users (name, total_seconds) VALUES (?, 0)`,
            name
        )

        return await this.get(name);
    }

    async update(
        id: number,
        newValue: number 
    ) {
        if (!this.db) throw new Error("Database is not initialized");

        await this.db.run(
            `UPDATE users SET total_seconds = ? WHERE id = ?`,
            newValue,
            id
        );
    }

    async getAll() {

        if (!this.db) throw new Error("Database is not initialized");

        const users = await this.db.all<User[]>(
            `SELECT * FROM users ORDER BY total_seconds`
        );

        return users;
    }


}

export default UserService;