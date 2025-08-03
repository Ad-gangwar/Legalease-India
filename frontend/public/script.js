document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === "visible") {
    document.title = "Legal-Ease India";
  } else {
    document.title = "Come Back To Legal-Ease India";
  }
});