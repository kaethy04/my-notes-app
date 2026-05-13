import * as SQLite from "expo-sqlite";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
};

const db = SQLite.openDatabaseSync("tasks.db");

export async function initDatabase() {
  try {
    await db.execAsync(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                status TEXT NOT NULL
            );
        `);
  } catch (error) {
    console.error("There were problems initializing the database: ", error);
    throw error;
  }
}

export async function addTask(title: string, description: string, status: string) {
  try {
    await db.runAsync(
      "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
      [title, description, status],
    );
  } catch (error) {
    console.error("Error adding task: ", error);
    throw error;
  }
}

export async function updateTask(
  id: number,
  title: string,
  description: string,
  status: string,
) {
  try {
    await db.runAsync(
      "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?",
      [title, description, status, id],
    );
  } catch (error) {
    console.error("Error updating task: ", error);
    throw error;
  }
}

export async function deleteTask(id: number) {
  try {
    await db.runAsync("DELETE FROM tasks WHERE id = ?", [id]);
  } catch (error) {
    console.error("Error deleting task: ", error);
    throw error;
  }
}

export async function getTasks(): Promise<Task[]> {
  try {
    return await db.getAllAsync("SELECT * FROM tasks ORDER BY id DESC") as Task[];
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    throw error;
  }
}
