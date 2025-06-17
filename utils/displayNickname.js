export const displayNick = (nickname) => {
  return nickname.startsWith("@") ? nickname : `@${nickname}`;
};
