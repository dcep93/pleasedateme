import { createRef } from "react";
import firebase, { DataType } from "./firebase";

const movieSuffixes = [".mp4", ".mov"];

export const bubbleStyle = {
  display: "inline-block",
  borderRadius: "1em",
  border: "2px solid black",
  padding: "0.7em",
  margin: "0.5em",
  backgroundColor: "white",
};

export type StateType = { [userId: string]: DataType };

const assets = [
  "2025_07_11.mp4",
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

export default function Assets(props: {
  state: StateType;
  myId: string;
  myName: string;
}) {
  const myResponses = props.state[props.myId] || {
    userId: props.myId,
    userName: props.myName,
  };
  return (
    <div>
      {assets
        .map((assetId) => ({
          assetId,
          assetKey: assetId.replaceAll(".", "_"),
          scoreRef: createRef<HTMLInputElement>(),
          commentRef: createRef<HTMLTextAreaElement>(),
        }))
        .map((o) => ({ ...o, myResponse: myResponses.responses?.[o.assetKey] }))
        .map((o, i) => (
          <div key={i}>
            <div style={bubbleStyle}>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "inline-flex",
                    flexDirection: "column",
                    minWidth: 0,
                    alignItems: "flex-start",
                    width: "auto",
                  }}
                >
                  <div style={{ display: "inline-block", width: "100%" }}>
                    {o.assetId}
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                    }}
                  >
                    {movieSuffixes.find((suffix) =>
                      o.assetId.toLowerCase().endsWith(suffix)
                    ) !== undefined ? (
                      <video
                        controls
                        style={{
                          maxWidth: "400px",
                          maxHeight: "400px",
                        }}
                        src={`/assets/${o.assetId}`}
                      ></video>
                    ) : (
                      <img
                        style={{
                          maxWidth: "400px",
                          maxHeight: "400px",
                        }}
                        src={`/assets/${o.assetId}`}
                        alt={"broken"}
                      />
                    )}
                  </div>
                </div>
                <div>
                  <div style={bubbleStyle}>
                    <h2>responses</h2>
                    <div style={bubbleStyle}>
                      <h3>me</h3>
                      <div>
                        score:{" "}
                        <input
                          ref={o.scoreRef}
                          type={"number"}
                          defaultValue={o.myResponse?.score}
                        />
                      </div>
                      <div>
                        comment:{" "}
                        <textarea
                          ref={o.commentRef}
                          defaultValue={o.myResponse?.comment}
                        />
                      </div>
                      <div>
                        <button
                          onClick={() =>
                            Promise.resolve()
                              .then(() => {
                                if (!myResponses.responses)
                                  myResponses.responses = {};
                                myResponses.responses[o.assetKey] = {
                                  score: parseInt(o.scoreRef.current!.value),
                                  comment: o.commentRef.current!.value,
                                };
                              })
                              .then(() => firebase.setData(myResponses))
                          }
                        >
                          update
                        </button>
                      </div>
                    </div>
                    <div>
                      {Object.entries(props.state)
                        .map(([userId, data]) => ({
                          userId,
                          data,
                        }))
                        .map(({ userId, data }) => ({
                          userId,
                          userName: data.userName,
                          responseData: data.responses?.[o.assetKey]!,
                        }))
                        .filter(
                          ({ userId, responseData }) =>
                            responseData && userId !== props.myId
                        )
                        .map(({ userId, responseData, userName }) => (
                          <div key={userId}>
                            <div>user: {userName}</div>
                            <div>score: {responseData.score}</div>
                            <div>comment: {responseData.comment}</div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
