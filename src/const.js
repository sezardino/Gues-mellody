const GameType = {
  ARTIST: "artist",
  GENRE: "genre",
};

const gameSettings = {
  errorCount: 3,
  time: 0.1,
};

const gameOver = {
  timeEnd: {
    title: `Увы и ах!`,
    total: `Время вышло! Вы не успели отгадать все мелодии`,
  },
  tryesEnd: {
    title: `Какая жалость!`,
    total: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`,
  },
};

export { GameType, gameOver, gameSettings };
