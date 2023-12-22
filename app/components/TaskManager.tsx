import {useContext, useState} from 'react';
import {TasksContext} from '../context/TaskContext';
import {ADD_NEW_LIST} from '../constants/Keys';
import {humanify, uglify} from '../utils/functions';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {TasksList} from './TasksList';

// TODO: combine these modals
const AddListModal = (props: any) => {
  const {showModal = false, setShowModal} = props;
  const {updateKaamKaajList} = useContext(TasksContext);
  const [listText, setListText] = useState('');
  const addNewList = () => {
    updateKaamKaajList({type: ADD_NEW_LIST, newListText: uglify(listText)});
    setListText('');
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
            <Text style={styles.modalTitleText}>Add A New List</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter Task"
            placeholderTextColor="grey"
            onChangeText={setListText}
            value={listText}
          />
          <Pressable style={styles.modalButton} onPress={addNewList}>
            <Text>Add List</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

function AddNewListButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <View>
      <Pressable style={styles.addListBtn} onPress={() => setShowModal(true)}>
        <AddListModal showModal={showModal} setShowModal={setShowModal} />
        <Text style={styles.addListBtnText}>+</Text>
      </Pressable>
    </View>
  );
}

export const TaskManager = () => {
  const {kaamKaamLists} = useContext(TasksContext);

  return (
    <ScrollView>
      <AddNewListButton />
      {Object.keys(kaamKaamLists).map((key: string) => {
        return (
          <TasksList
            key={key}
            listKey={key}
            title={humanify(key)}
            data={kaamKaamLists[key]?.tasks}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  addListBtn: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: '#ee6e73',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addListBtnText: {
    fontSize: 30,
  },
});
