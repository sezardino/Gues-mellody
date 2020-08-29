const formatTime = (time) => {
  return time.toString().length === 1 ? `0${time}` : time;
};

export { formatTime };
