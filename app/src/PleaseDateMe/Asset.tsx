const movieSuffixes = ["mp4", "mov"];

export const bubbleStyle = {
  display: "inline-block",
  borderRadius: "1em",
  border: "2px solid black",
  padding: "0.7em",
  margin: "0.5em",
  backgroundColor: "white",
};

export default function Asset(props: { assetId: string }) {
  return (
    <div>
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
              {props.assetId}
            </div>
            <div
              style={{
                display: "inline-block",
              }}
            >
              {movieSuffixes.find((suffix) =>
                props.assetId.toLowerCase().endsWith(suffix)
              ) !== undefined ? (
                <video
                  controls
                  style={{
                    maxWidth: "400px",
                    maxHeight: "400px",
                  }}
                  src={`/assets/${props.assetId}`}
                ></video>
              ) : (
                <img
                  style={{
                    maxWidth: "400px",
                    maxHeight: "400px",
                  }}
                  src={`/assets/${props.assetId}`}
                  alt={"broken"}
                />
              )}
            </div>
          </div>
          <div>
            <div style={bubbleStyle}>
              <h2>responses</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
