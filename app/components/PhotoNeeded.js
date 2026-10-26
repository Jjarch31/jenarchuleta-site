export default function PhotoNeeded({ children }) {
  return (
    <div className="photo-needed">
      <p className="photo-needed-k">Photo needed</p>
      <p>{children}</p>
    </div>
  );
}
