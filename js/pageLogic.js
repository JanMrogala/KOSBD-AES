var ivButton = document.getElementById("ivButton");
var iv = document.getElementById("iv");
var key = document.getElementById("key");
var encodeButton = document.getElementById("encode");
var decodeButton = document.getElementById("decode");
const encodingFormat = "UTF-8";

var keyLength = 128;
var codable = false;
var keyLengthCheck = false;
var ivLengthCheck = false;
var downloadable = false;

var usedIv;
var usedMessage;
var usedKeyLength;
var usedMode;

iv.addEventListener("input", ivInput);

function ivInput() {}

$(document).ready(function () {
  $("#message").change(function () {});

  $("#form1").click(function () {
    var selection = $("input[name=keyOptions]:checked", "#form1").val();
    if (selection === "option1") {
      keyLength = 128;
      checkLength(document.getElementById("key"), "#keyLabel", 1);
      checkLength(document.getElementById("iv"), "#ivLabel", 2);
    } else if (selection === "option2") {
      keyLength = 192;
      checkLength(document.getElementById("key"), "#keyLabel", 1);
      checkLength(document.getElementById("iv"), "#ivLabel", 2);
    } else if (selection === "option3") {
      keyLength = 256;
      checkLength(document.getElementById("key"), "#keyLabel", 1);
      checkLength(document.getElementById("iv"), "#ivLabel", 2);
    }
    console.log(keyLength);
  });

  $("#ivButton").click(function () {
    var iv = CryptoJS.lib.WordArray.random(keyLength / 16);

    $("#iv").val(iv);
    checkLength(document.getElementById("iv"), "#ivLabel", 2);
  });

  $("#encode").click(function () {
    if (!keyLengthCheck || !ivLengthCheck) {
      checkLength(document.getElementById("key"), "#keyLabel", 1);
      checkLength(document.getElementById("iv"), "#ivLabel", 2);
      return;
    }
    msg = $("#message").val();
    key = $("#key").val();
    iv = $("#iv").val();

    var encrypted = CryptoJS.AES.encrypt(msg, key, {
      iv: iv,
      mode:
        $("input[name=modeOptions]:checked", "#form2").val() === "option1"
          ? CryptoJS.mode.CBC
          : CryptoJS.mode.ECB,
    });
    $("#output").text(encrypted.toString());

    usedMessage = encrypted.toString();
    usedKeyLength = keyLength;
    usedIv = iv;
    usedMode =
      $("input[name=modeOptions]:checked", "#form2").val() === "option1"
        ? "CBC"
        : "CFB";
    downloadable = true;
  });

  $("#decode").click(function () {
    if (!keyLengthCheck || !ivLengthCheck) {
      checkLength(document.getElementById("key"), "#keyLabel", 1);
      checkLength(document.getElementById("iv"), "#ivLabel", 2);
      return;
    }
    encrypted = $("#message").val();
    key = $("#key").val();
    iv = $("#iv").val();

    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      mode:
        $("input[name=modeOptions]:checked", "#form2").val() === "option1"
          ? CryptoJS.mode.CBC
          : CryptoJS.mode.ECB,
    });
    $("#output").text(decrypted.toString(CryptoJS.enc.Utf8));

    usedMessage = decrypted.toString(CryptoJS.enc.Utf8);
    usedKeyLength = keyLength;
    usedIv = iv;
    usedMode =
      $("input[name=modeOptions]:checked", "#form2").val() === "option1"
        ? "CBC"
        : "CBC";
    downloadable = true;
  });

  $("#download").click(function () {
    if (!downloadable) return;
    content =
      "IV: " +
      usedIv +
      "\nKey_length: " +
      usedKeyLength +
      "\nMode: " +
      usedMode +
      "\nMessage:\n" +
      usedMessage;
    download($("#filename").val(), content);
  });
});

function checkLength(el, label, type) {
  var msgLength = encodeMessage(el.value).length * 8;

  $(label).text(
    type == 1
      ? "Key (" + msgLength + "/" + keyLength + " bits)"
      : "IV (" + msgLength + "/" + keyLength + " bits)"
  );

  if (msgLength == keyLength) {
    $(label).css("color", "rgb(38, 166, 154)");
    if (type == 1) keyLengthCheck = true;
    else ivLengthCheck = true;
  } else {
    $(label).css("color", "red");
    if (type == 1) keyLengthCheck = false;
    else ivLengthCheck = false;
  }
}

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

var input = document.getElementById("exampleFormControlFile1");

input.addEventListener("change", function () {
  if (this.files && this.files[0]) {
    var myFile = this.files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function (e) {
      $("#message").text(e.target.result);
    });

    reader.readAsText(myFile);
  }
});
