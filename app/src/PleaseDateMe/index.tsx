import { createRef } from "react";
import { JSX } from "react/jsx-runtime";
import Assets, { bubbleStyle, StateType } from "./Assets";
import firebase, { FirebaseWrapper } from "./firebase";

export default function PleaseDateMe() {
  return <Wrapper />;
}

const storageKey = "pleasedateme";

const myStorageValue: { myId: string; myName: string } = JSON.parse(
  localStorage.getItem(storageKey) || "{}"
);

class Wrapper extends FirebaseWrapper<StateType> {
  render(): JSX.Element {
    const ref = createRef<HTMLInputElement>();
    const setMyName = (myName: string) =>
      Promise.resolve()
        .then(() =>
          alert(
            JSON.stringify([
              this.state?.state,
              myStorageValue.myId,
              this.state?.state?.[myStorageValue.myId],
            ])
          )
        )
        .then(
          () =>
            this.state?.state?.[myStorageValue.myId] &&
            firebase.setData({
              userId: myStorageValue.myId,
              userName: myStorageValue.myName,
              responses: this.state.state[myStorageValue.myId].responses || {},
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
        <Assets
          state={this.state?.state || {}}
          myId={myStorageValue.myId}
          myName={myStorageValue.myName}
        />
      </div>
    );
  }
}
