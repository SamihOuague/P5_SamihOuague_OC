let matches = window.location.search.match(/^\?id=[a-zA-Z0-9-]{1,}/);
if (matches) {
    document.getElementById("orderId").innerText = matches[0].split("=")[1];
    setCookie("cart", "[]");
}