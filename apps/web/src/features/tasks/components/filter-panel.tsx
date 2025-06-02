import { Button } from "~/components/button";
import { Panel } from "~/components/panel";
import type { TasksFilterType } from "../types";

interface FilterPanelProps {
  filter: TasksFilterType;
  onFilterChange: (filter: TasksFilterType) => void;
  totalTasks: number;
  activeTasks: number;
  completedTasks: number;
  onCompleteAll: () => void;
  onDeleteCompleted: () => void;
}

export function FilterPanel({
  filter,
  onFilterChange,
  totalTasks,
  activeTasks,
  completedTasks,
  onCompleteAll,
  onDeleteCompleted,
}: FilterPanelProps) {
  return (
    <Panel className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("all")}
        >
          All ({totalTasks})
        </Button>
        <Button
          variant={filter === "active" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("active")}
        >
          Active ({activeTasks})
        </Button>
        <Button
          variant={filter === "completed" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("completed")}
        >
          Completed ({completedTasks})
        </Button>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onCompleteAll}
          disabled={activeTasks === 0}
        >
          Complete All
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={onDeleteCompleted}
          disabled={completedTasks === 0}
        >
          Delete Completed
        </Button>
      </div>
    </Panel>
  );
}
