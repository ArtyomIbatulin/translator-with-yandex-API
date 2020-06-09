const btn = document.querySelector("#btn");

btn.addEventListener("click", event => {
  event.preventDefault();
  const text = document.querySelector("#textarea_left").value;
  const request = new XMLHttpRequest();
  const API_key =
    "trnsl.1.1.20200218T131916Z.dd6789919eedf91d.ee0971cd2e27f405fae575fb987aba06e6d4c3a7";
  let url = "https://translate.yandex.net/api/v1.5/tr.json/translate";

  let langLeft = document.querySelector("#select1");
  let langRight = document.querySelector("#select2");

  url += "?key=" + API_key;
  url += "&text=" + text;
  url += "&lang=" + langLeft.value + "-" + langRight.value;

  request.addEventListener("load", function() {
    let response = JSON.parse(request.response);

    if (response.code !== 200) {
      textarea_right.style.color = "red";
      textarea_right.innerHTML =
        "Произошла ошибка при получении ответа от сервера:\n\n" +
        response.message;
      return;
    }

    if (response.text.length === 0) {
      textarea_right.style.color = "red";
      textarea_right.innerHTML =
        "К сожалению, перевод для данного слова не найден";
      return;
    }
    textarea_right.style.color = "black";
    textarea_right.innerHTML = response.text;
  });

  request.open("GET", url);
  request.send();
});
