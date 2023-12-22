import React, {createContext, useContext, useReducer, useState} from 'react';
import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';
import {
  ADD_NEW_LIST,
  ADD_NEW_TASK,
  DELETE_LIST,
  UPDATE_TASK_DONE,
} from '../constants/Keys';

const storage = new MMKVLoader().initialize();

type Task = {
  task: string;
  done: boolean;
  created_on: Date;
  finished_on?: Date;
};

type TasksListState = {[key: string]: {persisting: boolean; tasks: Task[]}};

export const TasksContext = createContext<{
  kaamKaamLists: TasksListState;
  updateKaamKaajList: (action: any) => void;
}>({kaamKaamLists: {}, updateKaamKaajList: () => {}});

export const TaskContextProvider = (props: {
  children: JSX.Element;
}): JSX.Element => {
  const [kaamKaamLists, setKaamKaamLists] = useMMKVStorage(
    'KaamKaajLists',
    storage,
    {},
  );

  const {children} = props;

  const initialTaskData = {
    too_doos: {
      persisting: false,
      tasks: [
        {
          task: 'Finish this app',
          done: false,
          created_on: new Date(),
        },
      ],
    },
    roj_ke_kaam: {
      persisting: true,
      tasks: [
        {
          task: 'Spititual Vid',
          done: true,
          created_on: new Date(),
        },
        {
          task: 'Learn some tech',
          done: false,
          created_on: new Date(),
        },
        {
          task: 'Book',
          done: false,
          created_on: new Date(),
        },
        {
          task: 'Podcast',
          done: false,
          created_on: new Date(),
        },
      ],
    },
  };

  async function updateKaamKaajList(action: any) {
    let newTasks: TasksListState = kaamKaamLists;
    let newData: Task[] = [];
    const {type = '', listKey = ''} = action;

    switch (type) {
      case UPDATE_TASK_DONE:
        let {index} = action;
        newData = newTasks[listKey].tasks;
        newData[index].done = !newData[index].done;

        newTasks[listKey].tasks = newData;
        break;

      case ADD_NEW_TASK:
        newData = newTasks[listKey].tasks;
        newData.push({
          task: action.newTaskText,
          done: false,
          created_on: new Date(),
        });
        newTasks[listKey].tasks = newData;
        break;

      case ADD_NEW_LIST:
        newTasks = {
          ...newTasks,
          [action.newListText]: {persisting: false, tasks: []},
        };
        break;

      case DELETE_LIST:
        console.log(listKey);
        delete newTasks[listKey];
        console.log(newTasks);
        break;

      default:
        console.error('Incorrect Action');
        break;
    }
    setKaamKaamLists(newTasks);
  }

  return (
    <TasksContext.Provider value={{kaamKaamLists, updateKaamKaajList}}>
      {children}
    </TasksContext.Provider>
  );
};
