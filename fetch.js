const btn = document.querySelector("#btn");

btn.addEventListener("click", event => {
  event.preventDefault();

  const text = document.querySelector("#textarea_left").value;
  const API_key =
    "trnsl.1.1.20200218T131916Z.dd6789919eedf91d.ee0971cd2e27f405fae575fb987aba06e6d4c3a7";
  let url = "https://translate.yandex.net/api/v1.5/tr.json/translate";
  let langLeft = document.querySelector("#select1");
  let langRight = document.querySelector("#select2");

  url += `?key=${API_key}`;
  url += `&text=${text}`;
  url += `&lang=${langLeft.value}-${langRight.value}`;

  fetch(url)
    .then(value => {
      if (value.status != 200) {
        return Promise.reject(value.status);
      }
      return value.json();
    })
    .then(result => {
      textarea_right.style.color = "black";
      textarea_right.innerHTML = result.text;
    })
    .catch(reason => {
      textarea_right.style.color = "red";
      textarea_right.innerHTML =
        "Произошла ошибка при получении ответа от сервера:\n\n" +
        "Ошибка " +
        reason;
    });
});
