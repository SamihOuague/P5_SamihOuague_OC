function createProduct(id, title, describ, img) {
    // Initiating products elements
    let link = document.createElement("a");
    let article = document.createElement("article");
    let picture = document.createElement("img");
    let heading = document.createElement("h3");
    let description = document.createElement("p");

    // Insert html attibute values
    link.href = "./product.html?id=" + id;
    heading.innerText = title;
    description.innerText = describ;
    picture.src = img;
    heading.classList.add("productName");
    description.classList.add("productDescription");

    // Insert products into the DOM
    article.appendChild(picture);
    article.appendChild(heading)
    article.appendChild(description);
    link.appendChild(article);
    document.getElementById("items").appendChild(link);
}

fetch("http://localhost:3000/api/products").then((res) => {
    return res.json();
}).then((value) => {
    for (let i in value) {
        const { _id, name, description, imageUrl } = value[i];
        createProduct(_id, name, description, imageUrl);
    }
});