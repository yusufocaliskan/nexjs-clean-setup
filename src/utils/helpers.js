export const hiddenEmail = (email) => {
    const atIndex = email?.indexOf("@");

    const [firstChar, ...middleChars] = email?.slice(0, atIndex);
    const lastChar = email?.charAt(atIndex - 1);
    const hiddenPart = "*".repeat(middleChars.length);

    return firstChar + hiddenPart + lastChar + email?.slice(atIndex);
  }