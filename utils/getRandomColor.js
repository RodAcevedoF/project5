export const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 70 + Math.random() * 30;
  const lightness = 40 + Math.random() * 20;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
