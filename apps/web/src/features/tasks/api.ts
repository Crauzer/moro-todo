import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Task } from "./types";
import { nanoid } from "nanoid";

const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  return "/api";
};

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: getBaseUrl() }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getAllTasks: builder.query<Task[], void>({
      query: () => "tasks",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Task" as const, id })),
              { type: "Task", id: "LIST" },
            ]
          : [{ type: "Task", id: "LIST" }],
    }),
    getCompletedTasks: builder.query<Task[], void>({
      query: () => "tasks/completed",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Task" as const, id })),
              { type: "Task", id: "COMPLETED" },
            ]
          : [{ type: "Task", id: "COMPLETED" }],
    }),
    createTask: builder.mutation<Task, { text: string }>({
      query: (body) => ({
        url: "tasks",
        method: "POST",
        body,
      }),
      async onQueryStarted({ text }, { dispatch, queryFulfilled }) {
        const tempId = nanoid();
        const optimisticTask: Task = {
          id: tempId,
          text,
          completed: false,
          createdDate: Date.now(),
        };

        const patchResult = dispatch(
          tasksApi.util.updateQueryData("getAllTasks", undefined, (draft) => {
            draft.unshift(optimisticTask);
          })
        );

        try {
          const { data: newTask } = await queryFulfilled;
          dispatch(
            tasksApi.util.updateQueryData("getAllTasks", undefined, (draft) => {
              const tempIndex = draft.findIndex((task) => task.id === tempId);
              if (tempIndex !== -1) {
                draft[tempIndex] = newTask;
              }
            })
          );
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tasksApi.util.updateQueryData("getAllTasks", undefined, (draft) => {
            const index = draft.findIndex((task) => task.id === id);
            if (index !== -1) {
              draft.splice(index, 1);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    updateTaskText: builder.mutation<Task, { id: string; text: string }>({
      query: ({ id, text }) => ({
        url: `tasks/${id}`,
        method: "POST",
        body: { text },
      }),
      async onQueryStarted({ id, text }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tasksApi.util.updateQueryData("getAllTasks", undefined, (draft) => {
            const task = draft.find((task) => task.id === id);
            if (task) {
              task.text = text;
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    completeTask: builder.mutation<Task, string>({
      query: (id) => ({
        url: `tasks/${id}/complete`,
        method: "POST",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tasksApi.util.updateQueryData("getAllTasks", undefined, (draft) => {
            const task = draft.find((task) => task.id === id);
            if (task) {
              task.completed = true;
              task.completedDate = Date.now();
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    incompleteTask: builder.mutation<Task, string>({
      query: (id) => ({
        url: `tasks/${id}/incomplete`,
        method: "POST",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tasksApi.util.updateQueryData("getAllTasks", undefined, (draft) => {
            const task = draft.find((task) => task.id === id);
            if (task) {
              task.completed = false;
              task.completedDate = undefined;
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    completeAllTasks: builder.mutation<
      { modified: number; tasks: Task[] },
      void
    >({
      query: () => ({
        url: "tasks/complete-all",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tasksApi.util.updateQueryData("getAllTasks", undefined, (draft) => {
            draft.forEach((task) => {
              if (!task.completed) {
                task.completed = true;
                task.completedDate = Date.now();
              }
            });
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteCompletedTasks: builder.mutation<{ deleted: number }, void>({
      query: () => ({
        url: "tasks/completed",
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tasksApi.util.updateQueryData("getAllTasks", undefined, (draft) => {
            return draft.filter((task) => !task.completed);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useGetCompletedTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskTextMutation,
  useCompleteTaskMutation,
  useIncompleteTaskMutation,
  useCompleteAllTasksMutation,
  useDeleteCompletedTasksMutation,
} = tasksApi;
