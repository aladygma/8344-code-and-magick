// Здравствуй Александр!
function getMessage(a, b) {
  if (typeof a == "boolean") {

    if (a) {
      return "Я попал в " + b;
    } else {
      return "Я никуда не попал";
    }

  } else if (typeof a == "number") {
    return "Я прыгнул на " + a * 100 + " сантиметров";

  } else if (typeof a == "object") {
    var sum = 0;
  // Може разумнее было написать отдельную функцию для подсчета элементов в массиве?
    for (var i = 0; i < a.length; i++) {
      sum += a[i];
    }

    return "Я прошел " + sum + " шагов";

  } else if (typeof a == "object" && typeof b == "object" ) {
    var length = 0;

    for (var i = 0; i < a.length; i++) {
      length += a[i] * b[i];
    }

    return "Я прошел " + length + " метров";
  }

}
