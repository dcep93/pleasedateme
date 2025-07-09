// https://console.firebase.google.com/u/0/project/pleasedateme/database/pleasedateme-default-rtdb/data

// @ts-ignore
import React from "react";
import firebase from "./firebase";

export type DataType = {
  userId: string;
  userName: string;
  scores: { [assetId: string]: { score: number; comment: string } };
};

function setData(data: DataType): Promise<void> {
  return firebase._set(data.userId, data);
}

export class FirebaseWrapper<T> extends React.Component<{}, { state: T }> {
  static firebaseWrapperComponent: FirebaseWrapper<any>;
  componentDidMount() {
    const oldComponent = FirebaseWrapper.firebaseWrapperComponent;
    FirebaseWrapper.firebaseWrapperComponent = this;
    if (oldComponent) {
      this.setState(oldComponent.state);
    } else {
      const title = this.getTitle();
      if (title !== null) document.title = title;
      firebase._connect(this.getFirebasePath(), (state) =>
        FirebaseWrapper.firebaseWrapperComponent.setState.bind(
          FirebaseWrapper.firebaseWrapperComponent
        )({ state })
      );
    }
  }

  getTitle(): string | null {
    return null;
  }

  getFirebasePath(): string {
    return `/`;
  }

  render() {
    return <pre>{JSON.stringify(this.state, null, 2)}</pre>;
  }
}

const ex = { setData };

export default ex;
