export type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
};

const STORAGE_KEY = "actix_tasks";

function readTasks(): Task[] {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as Task[];
  } catch {
    return [];
  }
}

function writeTasks(tasks: Task[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export async function initDatabase() {
  return;
}

export async function addTask(title: string, description: string, status: string) {
  const tasks = readTasks();
  const nextId = tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
  tasks.unshift({
    id: nextId,
    title,
    description,
    status,
  });
  writeTasks(tasks);
}

export async function updateTask(
  id: number,
  title: string,
  description: string,
  status: string,
) {
  const tasks = readTasks();
  const index = tasks.findIndex((task) => task.id === id);
  if (index >= 0) {
    tasks[index] = { id, title, description, status };
    writeTasks(tasks);
  }
}

export async function deleteTask(id: number) {
  const tasks = readTasks();
  writeTasks(tasks.filter((task) => task.id !== id));
}

export async function getTasks(): Promise<Task[]> {
  return readTasks();
}
