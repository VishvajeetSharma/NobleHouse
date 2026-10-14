import { notification } from "antd";

const Toast = ({ type = "success", content }) => {
  const config = {
    message: content,
    placement: "topRight",
    duration: 2,
  };

  switch (type.toLowerCase()) {
    case "success":
      notification.success(config);
      break;
    case "error":
      notification.error(config);
      break;
    case "warning":
      notification.warning(config);
      break;
    case "info":
      notification.info(config);
      break;
    default:
      notification.open(config);
  }
};

export default Toast;
