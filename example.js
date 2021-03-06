window.onload = function() {
  // Создаем объект XMLHttpRequest, при помощи которого будем отправлять запрос
  var req = new XMLHttpRequest();

  // Сохраняем ключ API, полученный со страницы https://tech.yandex.ru/keys/get/?service=trnsl
  // (с примером ниже работать не будет, нужно получить и вставить свой!)
  var API_KEY =
    "trnsl.1.1.20200218T131916Z.dd6789919eedf91d.ee0971cd2e27f405fae575fb987aba06e6d4c3a7";

  // Сохраняем адрес API
  var url = "https://translate.yandex.net/api/v1.5/tr.json/translate";

  // Формируем полный адрес запроса:
  url += "?key=" + API_KEY; // добавляем к запросу ключ API
  url += "&text=Текст для перевода"; // текст для перевода
  url += "&lang=ru-en"; // направление перевода: с русского на английский

  // Таким образом формируется строка вида:
  // https://translate.yandex.net/api/v1.5/tr.json/translate?key=example_api_key&text=кролики&lang=ru-en

  var translate = document.querySelector("#textarea_left");

  // Назначаем обработчик события load
  req.addEventListener("load", function() {
    console.log(req.response); // отображаем в консоли текст ответа сервера
    var response = JSON.parse(req.response); // парсим его из JSON-строки в JavaScript-объект

    // Проверяем статус-код, который прислал сервер
    // 200 — это ОК, остальные — ошибка или что-то другое
    if (response.code !== 200) {
      textarea_left.innerHTML =
        "Произошла ошибка при получении ответа от сервера:\n\n" +
        response.message;
      return;
    }

    // Проверяем, найден ли перевод для данного слова
    if (response.text.length === 0) {
      textarea_left.innerHTML =
        "К сожалению, перевод для данного слова не найден";
      return;
    }

    // Если все в порядке, то отображаем перевод на странице
    textarea_left.innerHTML = response.text.join("<br>"); // вставляем его на страницу
  });

  // Обработчик готов, можно отправлять запрос
  // Открываем соединение и отправляем
  req.open("get", url);
  req.send();
  textarea_right.innerHTML = url;
};
