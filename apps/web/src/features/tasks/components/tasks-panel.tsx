import { useState } from "react";
import { ErrorDisplay } from "~/components/error-display";
import {
  useGetAllTasksQuery,
  useCompleteAllTasksMutation,
  useDeleteCompletedTasksMutation,
} from "../api";
import { FilterPanel } from "./filter-panel";
import { handleError } from "~/utils";
import { TasksList } from "./tasks-list";
import { type TasksFilterType } from "../types";

export function TasksPanel() {
  const [filter, setFilter] = useState<TasksFilterType>("all");

  const {
    data: tasks = [],
    isFetching,
    error,
    refetch,
  } = useGetAllTasksQuery();

  const [completeAllTasks] = useCompleteAllTasksMutation();
  const [deleteCompletedTasks] = useDeleteCompletedTasksMutation();

  const handleCompleteAll = () => {
    completeAllTasks().catch((error) => {
      handleError(error, "Complete all tasks");
    });
  };

  const handleDeleteCompleted = () => {
    deleteCompletedTasks().catch((error) => {
      handleError(error, "Delete completed tasks");
    });
  };

  const handleRetry = () => {
    refetch();
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const activeTasks = totalTasks - completedTasks;

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Failed to Load Tasks"
        onRetry={handleRetry}
        retryLabel="Retry Loading"
        isLoading={isFetching}
      />
    );
  }

  return (
    <div className="space-y-6">
      <FilterPanel
        filter={filter}
        onFilterChange={setFilter}
        totalTasks={totalTasks}
        activeTasks={activeTasks}
        completedTasks={completedTasks}
        onCompleteAll={handleCompleteAll}
        onDeleteCompleted={handleDeleteCompleted}
      />

      <TasksList filter={filter} />
    </div>
  );
}
