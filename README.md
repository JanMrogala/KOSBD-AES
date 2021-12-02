## Návod (basic flow):

- Zašifrování
  - Uživatel do textového pole s označením *Message*, napíše libovolný text.
  - V případě že uživatel chce zašifrovat textový soubor, vloží jej pomocí tlačítka pod nápisem *Load text file* (Funguje pouze .txt).
  - Následně uživatel vybírá délku klíče (defaultně je zvolena délka 128 b) a napíše svůj tajný klíč.
  - Je třeba vložit inicializační vektor. Uživatel má na výběr vložit vlastní, nebo vygenerovat náhodný.
  - Dále si uživatel vybírá mód, ve kterém bude provedeno zašifrování zprávy.
  - Pro zašifrování zprávy uživatel kliká na tlačítko *Encode*
  - Pod nápisem *encoded/decoded message* se objeví zašifrovaná podoba zprávy.
  - Uživatel má možnost tlačítkem *Download* stáhnout potřebné informace o vykonaném procesu šifrování (uživatel si může pojmenovat soubor).

- Dešifrování
  - Uživatel vkládá zašifrovaný text do textového pole s označením *Message* (nebo načítá soubor se zašifrovanou zprávou).
  - Následně je třeba zadat klíč. Inicializační vektor, délka klíče a mód šifrování jsou nastaveny z textového souboru, pokud jej uživatel nahrál (jinak manuálně).
  - Dešifruje se tlačítkem *Decode*.
  - Dešifrovaný text se objeví pod nápisem *encoded/decoded message*.
  - Uživatel má možnost stáhnout soubor obsahující dešifrovanou zprávu.

## Dokumentace zásadních funkcí:

Použitá knihovna na šifrování: *CryptoJS*
</br></br></br>
funkce _encrypt_ se stará o zašifrování zprávy.

- **vstup:** zpráva, klíč, inicializační vektor
- **výstup:** zašifrovaný text

```
function encrypt(message, key, iv) {
  var key = CryptoJS.enc.Utf8.parse(key);
  var iv = CryptoJS.enc.Utf8.parse(iv);

  var encrypted = CryptoJS.AES.encrypt(message, key, { iv: iv });

  return encrypted.toString();
}
```

</br></br></br>
funkce _decrypt_ se stará o dešifrování zprávy.

- **vstup:** zašifrovaná zpráva, klíč, inicializační vektor
- **výstup:** dešifrovaný text

```
function decrypt(message, key, iv) {
  var key = CryptoJS.enc.Utf8.parse(key);
  var iv = CryptoJS.enc.Utf8.parse(iv);

  var code = CryptoJS.AES.decrypt(message, key, { iv: iv });
  var decryptedMessage = code.toString(CryptoJS.enc.Utf8);

  return decryptedMessage;
}
```

</br></br></br>
tento fragment kódu se stará o vytvoření náhodného inicializačního vektoru.

```
$("#ivButton").click(function () {
  var iv = CryptoJS.lib.WordArray.random(keyLength / 16);

  $("#iv").val(iv);
  checkLength(document.getElementById("iv"), "#ivLabel", 2);
});
```
