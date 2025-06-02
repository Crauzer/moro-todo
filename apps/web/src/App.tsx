import "./App.css";
import { useCreateTaskMutation } from "~/features/tasks/api";
import { TasksPanel } from "~/features/tasks/components";
import { Panel } from "./components/panel";
import { handleError } from "./utils";
import { AddTaskForm, type AddTaskFormData } from "./features/dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [createTask] = useCreateTaskMutation();

  const addTask = (data: AddTaskFormData) => {
    if (data.text.trim()) {
      createTask({ text: data.text }).catch((error) => {
        handleError(error, "Create task");
      });
    }
  };

  return (
    <div className=" text-foreground py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Panel className="flex flex-col items-start">
          <h1 className="text-4xl font-bold text-center text-primary">Todos</h1>
          <p className="text-center text-muted-foreground">
            Organize your tasks with ease.
          </p>
        </Panel>

        <Panel>
          <AddTaskForm onSubmit={addTask} />
        </Panel>

        <TasksPanel />
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        className="z-50"
      />
    </div>
  );
}

export default App;
