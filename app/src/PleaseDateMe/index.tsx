import { createRef } from "react";
import { JSX } from "react/jsx-runtime";
import Asset, { bubbleStyle } from "./Asset";
import firebase, { DataType, FirebaseWrapper } from "./firebase";

export default function PleaseDateMe() {
  return <Wrapper />;
}

const assets = [
  "0032.jpg",
  "0037.jpg",
  "0050.jpg",
  "ace.jpg",
  "climb.mp4",
  "IMG_1020.jpeg",
  "IMG_1092.jpeg",
  "IMG_1145.jpeg",
  "IMG_2426.jpeg",
  "IMG_2429.jpeg",
  "IMG_2464.jpeg",
  "IMG_2542.MOV",
  "IMG_2553.JPG",
  "IMG_2554.JPG",
  "IMG_5399.jpeg",
  "IMG_5400.jpeg",
  "IMG_6543.JPG",
  "Resized_20240619_132421.jpeg",
  "Resized_20240621_183023.jpeg",
  "Resized_20241225_105315.jpeg",
  "roses.mp4",
];

const storageKey = "me";

const myStorageValue: { myId: string; myName: string } = JSON.parse(
  localStorage.getItem(storageKey) || "{}"
);

class Wrapper extends FirebaseWrapper<{ [userId: string]: DataType }> {
  render(): JSX.Element {
    const ref = createRef<HTMLInputElement>();
    const setMyName = (myName: string) =>
      Promise.resolve()
        .then(() =>
          firebase.setData({
            userId: myStorageValue.myId,
            userName: myStorageValue.myName,
            responses: this.state.state[myStorageValue.myId]?.responses,
          })
        )
        .then(() =>
          localStorage.setItem(
            storageKey,
            JSON.stringify({ ...myStorageValue, myName })
          )
        )
        .then(() => window.location.reload());

    if (!myStorageValue.myId) {
      const myId = Math.floor(Date.now()).toString();
      Promise.resolve()
        .then(() =>
          firebase.setData({
            userId: myId,
            userName: myId,
          })
        )
        .then(() =>
          localStorage.setItem(
            storageKey,
            JSON.stringify({ myId, myName: myId })
          )
        )
        .then(() => window.location.reload());
      return <div></div>;
    }
    const submit = () =>
      Promise.resolve()
        .then(() => ref.current!.value)
        .then(setMyName);
    return (
      <div>
        <div style={bubbleStyle}>
          <h1>pleasedateme</h1>
          <div>
            your name:{" "}
            <input
              ref={ref}
              onSubmit={submit}
              defaultValue={myStorageValue.myName}
            />
            <button onClick={submit}>update</button>
          </div>
        </div>
        <div>
          {assets.map((assetId, i) => (
            <Asset key={i} assetId={assetId} />
          ))}
        </div>
      </div>
    );
  }
}
