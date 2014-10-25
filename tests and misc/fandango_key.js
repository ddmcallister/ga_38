var sigA = "r6kafxx75q3havh86syn8t4j";
var sigB = "EHgUzuP2qj";

var utcDate = Math.floor(Date.now() / 1000);

console.log(utcDate);

var preSig = sigA + sigB + utcDate;

console.log(preSig);

var sha = sha256.hash(preSig)

console.log(sha);

function converter(bytes) {
  for (var hex = [], i = 0; i < bytes.length; i++) {
    hex.push((bytes[i] >>> 4).toString(16));
    hex.push((bytes[i] & 0xF).toString(16));
  }
  return hex.join("");
}

var hex = converter(sha);
console.log(hex);
