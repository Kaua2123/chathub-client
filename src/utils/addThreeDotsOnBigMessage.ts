export const addThreeDotsOnBigMessage = (msg: string) => {
  if (msg && msg.length > 50) {
    const sliced = msg.slice(0, 53);
    const slicedWithDots = `${sliced}...`;
    return slicedWithDots;
  } else {
    return msg;
  }
};
