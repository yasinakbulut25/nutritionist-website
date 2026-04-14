import { Spinner } from "@heroui/react";

function Loader() {
  return (
    <div className="w-full py-4 flex items-center justify-center">
      <Spinner color="secondary" />
    </div>
  );
}

export default Loader;
