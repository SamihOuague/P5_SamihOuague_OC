let matches = window.location.search.match(/^\?id=[a-zA-Z0-9]{1,}/);
let qt = 1;
let id;
let color;
if (matches) {
    id = matches[0].split("=");
    fetch("http://localhost:3000/api/products/" + id[1]).then((res) => {
        return res.json();
    }).then((value) => {
        insertProduct(value.imageUrl, value.name, value.price, value.description, value.colors);
    });
}

if (!localStorage.getItem("cart")) {
    window.localStorage.setItem("cart", "[]");
}

document.getElementById("colors").addEventListener("change", (e) => {
    color = e.target.value;
});

document.getElementById("quantity").addEventListener("change", (e) => {
    qt = e.target.value;
});

document.getElementById("addToCart").addEventListener("click", () => {
    if (id && getCookie("cart") && color) {
        let cart = JSON.parse(getCookie("cart"));
        let existItem = cart.find((v) => v.id === id[1] && v.color === color);
        if (!existItem)
            cart.push({id: id[1], qt: qt, color: color});
        else
            existItem.qt++;
        setCookie("cart", JSON.stringify(cart));
        document.location = "/html/cart.html";
    }
});

function insertProduct(picUrl, title, price, description, colors) {
    // Initiating product element
    let picture = document.createElement("img");

    // Insert html attribute values
    picture.src = picUrl;
    document.getElementById("title").innerText = title;
    document.getElementById("price").innerText = price;
    document.getElementById("description").innerText = description;
    for (let i in colors) {
        let optionElt = document.createElement("option");
        optionElt.value = colors[i];
        optionElt.innerText = colors[i];
        document.getElementById("colors").appendChild(optionElt);
    }
    // Insert elements into the DOM
    document.getElementsByClassName("item__img")[0].appendChild(picture);
}