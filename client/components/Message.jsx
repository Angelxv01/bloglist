import React from "react";
import { useSelector } from "react-redux";

const Message = () => {
  const message = useSelector((state) => state.notification);
  if (message === null) {
    return null;
  }

  return <div className={message.type}>{message.message}</div>;
};

export default Message;
