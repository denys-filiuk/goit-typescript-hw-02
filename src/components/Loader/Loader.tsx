import { ReactElement } from "react";
import { ClipLoader } from "react-spinners";

export default function Loader(): ReactElement {
  return (
    <div>
      <ClipLoader size={50} color="#3f51b5" />
    </div>
  );
}
