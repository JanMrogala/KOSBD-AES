function encrypt(message, key, iv) {
  var key = CryptoJS.enc.Utf8.parse(key);
  var iv = CryptoJS.enc.Utf8.parse(iv);

  var encrypted = CryptoJS.AES.encrypt(message, key, { iv: iv });

  return encrypted.toString();
}

function decrypt(message, key, iv) {
  var key = CryptoJS.enc.Utf8.parse(key);
  var iv = CryptoJS.enc.Utf8.parse(iv);

  var code = CryptoJS.AES.decrypt(message, key, { iv: iv });
  var decryptedMessage = code.toString(CryptoJS.enc.Utf8);

  return decryptedMessage;
}

function encodeMessage(message) {
  const encoder = new TextEncoder("UTF-8");
  const view = encoder.encode(message);

  return view;
}
