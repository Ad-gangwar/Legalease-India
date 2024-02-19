//prevent right-click
document.oncontextmenu = () => {
  return false;
}

//disable f12 key
document.onkeydown = e => {
  if (e.key === "F12") {
    return false;
  }

  //prevent view page source
  if (e.ctrlKey && e.key === "U") {
    return false;
  }
}


document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === "visible") {
    document.title = "Legal-Ease India";
  } else {
    document.title = "Come Back To Legal-Ease India";
  }
});