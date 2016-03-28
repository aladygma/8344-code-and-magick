function getMessage(a, b) {
  var aType = typeof a;

  switch (aType) {
    case "boolean":

      if (a) {
        return "Я попал в " + b;
      } else {
        return "Я никуда не попал";
      }

      break;

    case "number":
      return "Я прыгнул на " + a * 100 + " сантиметров";
      break;
// Саша, мне не нравится следующий участок кода.
// Пожалуйста подскажи, если можно его улучшить

    case "object":
      var aArray = Array.isArray(a);
      var bArray = Array.isArray(b);

      if (aArray && bArray) {
        var length = 0;

        for (var i = 0; i < a.length; i++) {
          length += a[i] * b[i];
        }

        return "Я прошёл " + length + " метров";

      } else if (aArray) {
        var sum = 0;

        var sum = a.reduce(function(total, current) {
          return total + current;
        }, 0);

        return "Я прошёл " + sum + " шагов";

        } else {
          return "Я сделал что-то странное"
        }

      break;

    default:
      alert("Я сделал что-то странное");
  }
}
