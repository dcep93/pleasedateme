import { createRef, useEffect, useState } from "react";
import firebase, { DataType } from "./firebase";

const adminId = "1754539174044";

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

export default function Assets(props: {
  state: StateType;
  userId: string;
  userName: string;
}) {
  const [assets, updateAssets] = useState<string[]>([]);
  useEffect(() => {
    fetch(
      "https://api.github.com/repos/dcep93/pleasedateme/contents/app/public/assets"
    )
      .then((resp) => resp.json())
      .then((j) => j.map((jj: { name: string }) => jj.name).sort())
      .then(updateAssets);
  }, []);
  const myResponses = props.state[props.userId] || {
    userId: props.userId,
    userName: props.userName,
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
              <div style={{ display: "flex", alignItems: "start" }}>
                <div style={bubbleStyle}>
                  <div>
                    #{i + 1}/{assets.length}
                  </div>
                  <div style={{ display: "inline-block", width: "100%" }}>
                    {o.assetId}
                  </div>
                </div>
                <div>
                  <div>
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
                            responseData &&
                            (props.userId === adminId || userId === adminId)
                        )
                        .map(({ userId, responseData, userName }) => (
                          <div style={bubbleStyle} key={userId}>
                            <div>from: {userName}</div>
                            <div>score: {responseData.score}</div>
                            <div
                              style={{ paddingLeft: "2em", textIndent: "-2em" }}
                            >
                              comment: {responseData.comment}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div style={bubbleStyle}>
                    <div>
                      score 0-100:{" "}
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
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "auto",
                  }}
                >
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
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
