import { ClipLoader } from "react-spinners";

export default function Loader(): JSX.Element {
  return (
    <div>
      <ClipLoader size={50} color="#3f51b5" />
    </div>
  );
}
