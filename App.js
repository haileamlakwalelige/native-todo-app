import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from "react-native";

const DATA = [
  {
    id: "1",
    title: "Meditation",
    completed: false,
  },
  {
    id: "2",
    title: "Coding",
    completed: false,
  },
  {
    id: "3",
    title: "Journalism",
    completed: false,
  },
  {
    id: "4",
    title: "Developer",
    completed: false,
  },
];

export default function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState(DATA);
  const [visible, setIsVisible] = useState(false);

  const addNewData = () => {
    let newTodo = {
      id: data.length,
      title: text,
      completed: false,
    };

    setData([...data, newTodo]);
    setText("");
  };
  const markItemCompleted = (item) => {
    const itemIndex = data.findIndex((currItem) => currItem.id === item.id);
    if (itemIndex !== -1) {
      const updateItems = [...data];
      updateItems[itemIndex] = { ...data[itemIndex], completed: true };
      setData(updateItems);
      setIsVisible(false);
    } 
  };


  const TodoList = (props) => {
    return (
      <TouchableOpacity
        onPress={() => markItemCompleted(props.item)}
        className="items-stretch"
      >
        <Text
          className={
            props.item.completed
              ? "py-4 rounded-xl px-10 bg-green-500 my-3 min-w-[200px] text-center text-white text-[18px]"
              : "py-4 rounded-xl px-10 bg-[#6db6dd] my-3 min-w-[200px] text-center text-white text-[18px]"
          }
        >
          {props.item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const handlePress = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className="text-[23px] font-bold text-green-500 border-b-2 border-green-500 min-w-[200px] text-center pt-4 pb-2">
        TODO APP
      </Text>
      <StatusBar style="auto" />
      {visible ? (
        <Modal>
          <View className="shadow-xl rounded-xl flex flex-col justify-center items-center mx-4 my-4">
            <TextInput
              onChangeText={setText}
              value={text}
              className="border-2 my-10 rounded border-gray-400 text-slate-800 text-[16px] w-[200px] h-[40px] mt-10"
            />
            <View className="flex justify-start items-start -mt-10">
              <TouchableOpacity
                onPress={addNewData}
                className="min-w-full  min-h-[40px] text-black  text-center py-2  px-10 my-3"
              >
                <Text onPress={closeModal} className="text-blue-500  text-center font-bold text-[20px]">
                  Add
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : null}

      {data.map((item, index) => {
        return (
          <View key={index} className="items-stretch">
            <TodoList item={item} />
          </View>
        );
      })}
      <View className=" shadow-xl rounded-full bg-white min-w-[70px] min-h-[70px]  flex justify-center items-center">
        <TouchableOpacity onPress={handlePress}>
          <Text className="font-light text-[50px] text-blue-500">+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
