function encrypt(message = "", key = "") {
  var message = CryptoJS.AES.encrypt(message, key);
  return message.toString();
}
function decrypt(message = "", key = "") {
  var code = CryptoJS.AES.decrypt(message, key);
  var decryptedMessage = code.toString(CryptoJS.enc.Utf8);

  return decryptedMessage;
}

console.log(encrypt("Hello World"));
console.log(decrypt("U2FsdGVkX1/0oPpnJ5S5XTELUonupdtYCdO91v+/SMs="));
