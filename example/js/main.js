document.addEventListener('DOMContentLoaded', function () {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((item) => {
    new CustomForm(item);
  });

  const radio = document.querySelectorAll('input[type="radio"]');
  radio.forEach((item) => {
    new CustomForm(item);
  });

  const select = document.querySelectorAll('select');
  select.forEach((item) => {
    new CustomForm(item);
  });

  const file = document.querySelectorAll('input[type="file"]');
  file.forEach((item) => {
    new CustomForm(item);
  });
});