import { JSX } from "react/jsx-runtime";
import { DataType, FirebaseWrapper } from "./firebase";

export default function PleaseDateMe() {
  return <Wrapper />;
}

class Wrapper extends FirebaseWrapper<{ [userId: string]: DataType }> {
  render(): JSX.Element {
    return <div>pleasedateme</div>;
  }
}
