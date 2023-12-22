export type Task = {
  task: string;
  done: boolean;
  created_on: Date;
  finished_on?: Date;
};

export type TasksListState = {
  [key: string]: {persisting: boolean; tasks: Task[]};
};
