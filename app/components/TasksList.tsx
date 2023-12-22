import {useContext, useState} from 'react';
import {ADD_NEW_TASK, DELETE_LIST, UPDATE_TASK_DONE} from '../constants/Keys';
import {TasksContext} from '../context/TaskContext';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Task} from '../constants/Types';
import {humanify} from '../utils/functions';

export type TasksListProps = {
  title: string;
  data: Task[];
  listKey: string;
};

// TODO: any
const AddItemModal = (props: any) => {
  const {showModal = false, setShowModal, listKey} = props;
  const {updateKaamKaajList} = useContext(TasksContext);
  const [taskText, setTaskText] = useState('');
  const addTaskToList = () => {
    updateKaamKaajList({
      type: ADD_NEW_TASK,
      listKey: listKey,
      newTaskText: taskText,
    });
    setTaskText('');
    setShowModal(false);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setShowModal(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalTitle}>
            <Text style={styles.modalTitleText}>Add task to</Text>
            <Text style={styles.modalTitleText}>{humanify(listKey)}</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter Task"
            placeholderTextColor="grey"
            onChangeText={setTaskText}
            value={taskText}
          />
          <Pressable style={styles.modalButton} onPress={addTaskToList}>
            <Text>Add Task</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

// TODO: combine these modals

const DeleteListModal = (props: any) => {
  const {showModal = false, setShowModal, listKey} = props;
  const {updateKaamKaajList} = useContext(TasksContext);

  const deleteList = () => {
    updateKaamKaajList({type: DELETE_LIST, listKey: listKey});
    setShowModal(false);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setShowModal(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalTitle}>
            <Text style={styles.modalTitleText}>
              Are you sure you want to delete this list?
            </Text>
          </View>
          <Pressable style={styles.modalButton} onPress={deleteList}>
            <Text>Yes</Text>
          </Pressable>
          <Pressable
            style={styles.modalButton}
            onPress={() => {
              setShowModal(false);
            }}>
            <Text>No</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export const TasksList = (props: TasksListProps) => {
  const {title, data, listKey} = props;
  const {updateKaamKaajList} = useContext(TasksContext);

  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showDeleteListModal, setShowDeleteListModal] = useState(false);

  const updateTaskDone = (index: number) => {
    updateKaamKaajList({
      type: UPDATE_TASK_DONE,
      listKey: listKey,
      index: index,
    });
  };
  return (
    <View style={styles.container}>
      <AddItemModal
        showModal={showAddItemModal}
        setShowModal={setShowAddItemModal}
        listKey={listKey}
      />
      <DeleteListModal
        showModal={showDeleteListModal}
        setShowModal={setShowDeleteListModal}
        listKey={listKey}
      />
      <View style={styles.listHead}>
        <Text style={styles.title}>{title}</Text>
        <Pressable
          style={styles.button}
          onPress={() => setShowAddItemModal(true)}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => setShowDeleteListModal(true)}>
          <Text style={styles.buttonText}>x</Text>
        </Pressable>
      </View>

      <View style={styles.list}>
        {data.map((listItem, idx) => {
          // TODO: any
          let itemStyles: any = [styles.listItem];
          if (listItem.done) itemStyles.push(styles.taskDone);
          return (
            <View key={listKey + idx}>
              <Text onPress={() => updateTaskDone(idx)} style={itemStyles}>
                {listItem.task}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  listHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  list: {
    marginTop: 8,
    paddingLeft: 16,
  },
  listItem: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: 8,
  },
  taskDone: {
    textDecorationLine: 'line-through',
  },

  centeredView: {
    flex: 1,
  },
  modalView: {
    marginHorizontal: 50,
    marginVertical: 160,
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
  },
  button: {
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 10,
  },
  input: {
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
  modalTitle: {
    alignItems: 'center',
  },
  modalTitleText: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
