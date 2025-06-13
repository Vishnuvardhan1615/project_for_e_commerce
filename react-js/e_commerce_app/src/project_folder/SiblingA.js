// SiblingA.js
function SiblingA({ setShared }) {
  return <button onClick={() => setShared("From SiblingA")}>Update</button>;
}

export default SiblingA;
