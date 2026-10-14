import { ThreeDots } from "react-loader-spinner";

const Loader = ({ height = 80, width = 80, color = "#fe7d31" }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <ThreeDots
        height={height}
        width={width}
        radius="9"
        color={color}
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );
};

export default Loader;
