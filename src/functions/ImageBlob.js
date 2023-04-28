export const ImageBlob = (image) => {
  var base64 = image.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
  let mime = "image/jpeg";
  mime = mime || "";
  var sliceSize = 1024;
  var byteChars = window.atob(base64);
  var byteArrays = [];
  for (
    var offset = 0, len = byteChars.length;
    offset < len;
    offset += sliceSize
  ) {
    var slice = byteChars.slice(offset, offset + sliceSize);
    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, { type: mime });
};
