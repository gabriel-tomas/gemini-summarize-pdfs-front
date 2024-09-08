export const noty = (text, type) => {
  new Noty({
    text,
    type,
    timeout: 3000,
    progressBar: true
  }).show();
}