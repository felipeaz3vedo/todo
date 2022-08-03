import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Tasks } from './components/Tasks';

export interface ITask {
  id: string;
  title: string;
  isCompleted: boolean;
}

const LOCAL_STORAGE_KEY = 'todo:savedTasks';

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  function loadTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  function setTaskAndSave(newTasks: ITask[]) {
    setTasks(newTasks);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  function addTask(taskTitle: string) {
    setTaskAndSave([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: taskTitle,
        isCompleted: false,
      },
    ]);
  }

  function deleteTaskById(taskId: string) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTaskAndSave(newTasks);
  }

  function toggleTaskCompletedById(taskId: string) {
    const newTask = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    setTaskAndSave(newTask);
  }

  return (
    <div>
      <Header onAddTask={addTask} />
      <Tasks
        tasks={tasks}
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedById}
      />
    </div>
  );
}
