import { JSX } from "react/jsx-runtime";
import { DataType, FirebaseWrapper } from "./firebase";

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

class Wrapper extends FirebaseWrapper<{ [userId: string]: DataType }> {
  render(): JSX.Element {
    return <div>pleasedateme</div>;
  }
}
