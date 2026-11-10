
import { getMetadata } from "@/data/metadata";
import VideoPage from "./VideoPage";



export const metadata = getMetadata("video");

export default function Page() {
  return (
    <VideoPage/>
  );
}