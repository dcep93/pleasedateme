import { createRef } from "react";
import { JSX } from "react/jsx-runtime";
import Assets, { bubbleStyle, StateType } from "./Assets";
import firebase, { FirebaseWrapper } from "./firebase";

export default function PleaseDateMe() {
  return <Wrapper />;
}

const storageKey = "pleasedateme";

const myStorageValue: { userId: string; userName: string } = JSON.parse(
  localStorage.getItem(storageKey) || "{}"
);

class Wrapper extends FirebaseWrapper<StateType> {
  render(): JSX.Element {
    const ref = createRef<HTMLInputElement>();
    const setMyName = (userName: string) =>
      Promise.resolve()
        .then(() => Object.assign(myStorageValue, { userName }))
        .then(
          () =>
            this.state?.state?.[myStorageValue.userId] &&
            firebase.setData({
              ...myStorageValue,
              responses:
                this.state.state[myStorageValue.userId].responses || {},
            })
        )
        .then(() =>
          localStorage.setItem(storageKey, JSON.stringify(myStorageValue))
        )
        .then(() => window.location.reload());

    if (!myStorageValue.userId) {
      const userId = Math.floor(Date.now()).toString();
      Promise.resolve()
        .then(() =>
          localStorage.setItem(
            storageKey,
            JSON.stringify({ userId, userName: userId })
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
              defaultValue={myStorageValue.userName}
            />
            <button onClick={submit}>update</button>
          </div>
        </div>
        <Assets state={this.state?.state || {}} {...myStorageValue} />
      </div>
    );
  }
}
