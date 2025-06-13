import { useState } from "react";
import SiblingA from "./SiblingA";
import SiblingB from "./SiblingB";

function Parent() {
  const [shared, setShared] = useState("");
  return (
    <>
      <SiblingA setShared={setShared} />
      <SiblingB shared={shared} />
    </>
  );
}

export default Parent;