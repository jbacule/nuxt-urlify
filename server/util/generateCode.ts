const generateCode = (maxLength: number): string => {
  const possibleChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < maxLength; i++) {
    code += possibleChars.charAt(
      Math.floor(Math.random() * possibleChars.length)
    );
  }
  return code;
};

export default generateCode;
