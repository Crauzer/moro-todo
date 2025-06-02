import { Button } from "~/components/button";
import { Checkbox } from "~/components/checkbox";
import { Input } from "~/components/input";
import { FaTrash } from "react-icons/fa";
import { LoadingSpinner } from "~/components";
import {
  useCompleteTaskMutation,
  useDeleteTaskMutation,
  useGetAllTasksQuery,
  useIncompleteTaskMutation,
  useUpdateTaskTextMutation,
} from "../api";
import { useState } from "react";
import { handleError } from "~/utils";
import { type Task } from "../types";
import { type TasksFilterType } from "~/features/dashboard";
import { twMerge } from "tailwind-merge";

export const TasksList = ({ filter }: { filter: TasksFilterType }) => {
  const allTasks = useGetAllTasksQuery();
  const [completeTask] = useCompleteTaskMutation();
  const [incompleteTask] = useIncompleteTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const [editingTask, setEditingTask] = useState<string | null>(null);

  const toggleTask = (id: string, completed: boolean) => {
    if (completed) {
      incompleteTask(id).catch((error) => {
        handleError(error, "Mark task incomplete");
      });
    } else {
      completeTask(id).catch((error) => {
        handleError(error, "Mark task complete");
      });
    }
  };

  const startEditing = (taskId: string) => {
    setEditingTask(taskId);
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id).catch((error) => {
      handleError(error, "Delete task");
    });
  };

  const filteredTasks = allTasks.data?.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return allTasks.isLoading ? (
    <div className="flex flex-col items-center justify-center gap-4">
      <LoadingSpinner size="xl" />
      <p className="mt-4 text-muted-foreground">Loading tasks...</p>
    </div>
  ) : (
    <div className="h-[500px] overflow-y-auto">
      <div className="space-y-3 pr-4">
        {filteredTasks?.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 p-4 backdrop-blur-sm bg-white/5 rounded-lg border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-200"
          >
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id, task.completed)}
              size="lg"
            />
            {editingTask === task.id ? (
              <TaskItemEditNameInput
                task={task}
                onFinishEditing={() => setEditingTask(null)}
              />
            ) : (
              <span
                className={twMerge(
                  "flex-1 cursor-pointer",
                  task.completed && "line-through text-muted-foreground",
                  "wrap-break-word overflow-hidden"
                )}
                onDoubleClick={() => startEditing(task.id)}
                title="Double-click to edit"
              >
                {task.text}
              </span>
            )}
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDeleteTask(task.id)}
            >
              <FaTrash />
            </Button>
          </div>
        ))}
      </div>

      {filteredTasks?.length === 0 &&
        allTasks.data &&
        allTasks.data.length > 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-center text-muted-foreground">
              No {filter} tasks found.
            </p>
          </div>
        )}

      {allTasks.data?.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-center text-muted-foreground">
            No tasks yet. Add one above!
          </p>
        </div>
      )}
    </div>
  );
};

const TaskItemEditNameInput = ({
  task,
  onFinishEditing,
}: {
  task: Task;
  onFinishEditing: () => void;
}) => {
  const [updateTaskText] = useUpdateTaskTextMutation();

  const [editText, setEditText] = useState(task.text || "");

  const cancelEditing = () => {
    setEditText(task.text || "");
    onFinishEditing();
  };

  const saveEdit = () => {
    const trimmedText = editText.trim();

    if (trimmedText === task.text) {
      onFinishEditing();
      return;
    }

    updateTaskText({ id: task.id, text: trimmedText })
      .then(() => {
        onFinishEditing();
      })
      .catch((error) => {
        handleError(error, "Update task");
        onFinishEditing();
      });
  };

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveEdit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancelEditing();
    }
  };

  return (
    <Input
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
      onKeyDown={handleEditKeyDown}
      onBlur={saveEdit}
      className="flex-1 backdrop-blur-sm bg-white/10 border-white/20"
      autoFocus
      maxLength={500}
    />
  );
};
