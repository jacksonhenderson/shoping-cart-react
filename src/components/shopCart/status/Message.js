const Complete = [
  "Visit our quality products!",
  "Do you want to buy?",
  "Experience quality with us!",
  "Send in the fastest way possible!",
];

const msgComplete = () => {
  const len = Complete.length;
  const msg = Complete;
  const result = msg[Math.floor(Math.random() * len)];
  return result;
};

export { msgComplete };
