import React, { useEffect, useState } from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit, MdAddCircle, MdAutorenew } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import firebase from "./config/firebase";
import firestore from "firebase";

function App() {
  const [list, setList] = useState([]);
  const [text, setText] = useState("");
  const [update, setUpdate] = useState(true);
  const [indexId, setIndexId] = useState("");
  const [data, setData] = useState("");
  useEffect(() => {
    getData();
  }, []);
  console.log(list);

  // Fetching the data from the firebase
  const getData = function () {
    firebase
      .firestore()
      .collection("list")
      .onSnapshot((res) => {
        let newData = [];
        res.forEach((docs) => {
          // console.log(item.data());
          let currentID = docs.id;
          let appObj = { ...docs.data(), ["id"]: currentID };
          newData.push(appObj);
        });
        setList(newData);
      });
  };

  // Uodating the Data
  const updateItem = function () {
    console.log(indexId);
    firebase.firestore().collection("list").doc(indexId).update({
      text,
    });
    setUpdate(true);
    setText("");
  };

  // Editing Firebase Data
  const editItem = function (data) {
    setIndexId(data.id);
    setText(data.text);
    setUpdate(false);
  };

  const addItem = function () {
    // Sending data to firebase

    firebase
      .firestore()
      .collection("list")
      .add({ text })
      .then((res) => {
        alert("Data sent");
      })
      .catch((e) => {
        alert(e.message);
      });

    setText("");
  };

  // Deleting Data From Firebase
  const deleteItem = function (data) {
    firebase.firestore().collection("list").doc(data.id).delete();
  };

  return (
    <div className="main">
      <div>
        <h1 style={{ textAlign: "center" }}>To-DO App</h1>
      </div>

      <div className="head">
        <input
          value={text}
          className="input"
          placeholder="Enter items here..."
          onChange={(e) => setText(e.target.value)}
        />

        {update ? (
          <Button
            variant="contained"
            color="primary"
            className="button"
            onClick={addItem}
          >
            <MdAddCircle size={20} />
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            className="button"
            onClick={updateItem}
          >
            <MdAutorenew />
          </Button>
        )}
      </div>
      <div>
        <ul>
          {list.map((item) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "30rem",
                }}
                className="list"
              >
                <li
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "large",
                  }}
                >
                  {item.text}
                </li>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      className="button"
                      onClick={() => editItem(item)}
                    >
                      <MdEdit />
                    </Button>
                  </div>
                  <p>&nbsp;&nbsp; &nbsp;&nbsp;</p>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      className="deleteButton"
                      onClick={() => deleteItem(item)}
                    >
                      <AiFillDelete />
                    </Button>
                  </div>
                </div>

                <br />
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
