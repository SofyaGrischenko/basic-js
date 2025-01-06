const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  validateInput(message, key) {
    if (!message || !key) {
      throw new Error("Incorrect arguments!");
    }
  }

  encrypt(message, key) {
    this.validateInput(message, key);

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    message = message.toUpperCase();
    key = key.toUpperCase();
    let result = "";
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      const messageChar = message[i];
      const keyChar = key[keyIndex % key.length];

      if (alphabet.includes(messageChar)) {
        const encryptedChar =
          alphabet[
            (alphabet.indexOf(messageChar) + alphabet.indexOf(keyChar)) % 26
          ];
        result += encryptedChar;
        keyIndex++;
      } else {
        result += messageChar;
      }
    }

    return this.isDirect ? result : result.split("").reverse().join("");
  }

  decrypt(encryptedMessage, key) {
    this.validateInput(encryptedMessage, key);

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    encryptedMessage = encryptedMessage.toUpperCase();
    key = key.toUpperCase();
    let result = "";
    let keyIndex = 0;

    for (let i = 0; i < encryptedMessage.length; i++) {
      const encryptedChar = encryptedMessage[i];
      const keyChar = key[keyIndex % key.length];

      if (alphabet.includes(encryptedChar)) {
        const decryptedChar =
          alphabet[
            (alphabet.indexOf(encryptedChar) - alphabet.indexOf(keyChar) + 26) %
              26
          ];
        result += decryptedChar;
        keyIndex++;
      } else {
        result += encryptedChar;
      }
    }

    return this.isDirect ? result : result.split("").reverse().join("");
  }
}

module.exports = {
  VigenereCipheringMachine,
};
