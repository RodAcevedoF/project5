const displayNick = (nickname) => {
  return nickname.startsWith("@") ? nickname : `@${nickname}`;
};
export default displayNick;
