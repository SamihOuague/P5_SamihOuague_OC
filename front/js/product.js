function insertProduct(picUrl, title, price, description, colors) {
    console.log(colors);
    // Initiating product element
    let picture = document.createElement("img");

    // Insert html attribute values
    picture.src = picUrl;
    document.getElementById("title").innerText = title;
    document.getElementById("price").innerText = price;
    document.getElementById("description").innerText = description;
    for (i in colors) {
        let optionElt = document.createElement("option");
        optionElt.value = colors[i];
        optionElt.innerText = colors[i];
        document.getElementById("colors").appendChild(optionElt);
    }
    // Insert elements into the DOM
    document.getElementsByClassName("item__img")[0].appendChild(picture);
}

let matches = window.location.search.match(/^\?id=[a-zA-Z0-9]{1,}/);
let id;
if (matches) {
    id = matches[0].split("=");
    console.log(id);
    fetch("http://localhost:3000/api/products/" + id[1]).then((res) => {
        return res.json();
    }).then((value) => {
        insertProduct(value.imageUrl, value.name, value.price, value.description, value.colors);
    });
}