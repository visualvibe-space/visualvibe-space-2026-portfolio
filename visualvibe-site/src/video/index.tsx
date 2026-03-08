import { Composition } from "remotion";
import { Video } from "./Video";

export const compositions = () => {
  return (
    <>
      <Composition
        id="VisualVibeAd"
        component={Video}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
