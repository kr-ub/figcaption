const $header = document.querySelector("header");
const $main = document.querySelector("main");

function readURL(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      document.querySelector(".img").src = e.target.result;
    }
    reader.readAsDataURL(input.files[0]);
  }
}
// export function bindEvent() {
//   const $inputFile = $main.querySelector(".input-file");
//   $inputFile.addEventListener("change", e => {
//     readURL(e.target);
//   })
// }