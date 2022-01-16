function insertElement(prod, cbDel, cbChange) {
    // Initiating cart elements
    let article = document.createElement("article");
    let itemImg = document.createElement("div");
    let picture = document.createElement("img");
    let itemContent = document.createElement("div");
    let description = document.createElement("div");
    let title = document.createElement("h2");
    let pColor = document.createElement("p");
    let pPrice = document.createElement("p");
    let settings = document.createElement("div");
    let quantity = document.createElement("div");
    let pLabel = document.createElement("p");
    let qInput = document.createElement("input");
    let deleteCont = document.createElement("div");
    let deleteLink = document.createElement("p");

    // Add class
    article.classList.add("cart__item");
    itemImg.classList.add("cart__item__img");
    itemContent.classList.add("cart__item__content");
    description.classList.add("cart__item__content__description");
    settings.classList.add("cart__item__content__settings");
    quantity.classList.add("cart__item__content__settings__quantity");
    deleteCont.classList.add("cart__item__content__settings__delete");
    deleteLink.classList.add("deleteItem");
    qInput.classList.add("itemQuantity");
    
    // Initiating attribute values
    article.dataset.id = prod.id;
    article.dataset.color = prod.color;
    picture.src = prod.imageUrl;
    title.innerText = prod.name;
    pColor.innerText = prod.color;
    pPrice.innerText = prod.price + " €";
    pLabel.innerText = "Qté : ";
    deleteLink.innerText = "supprimer";
    qInput.type = "number";
    qInput.defaultValue = prod.qt;
    qInput.min = "1";
    qInput.max = "100";

    // Inserting elements into the DOM
    itemImg.appendChild(picture);
    description.appendChild(title);
    description.appendChild(pColor);
    description.appendChild(pPrice);
    quantity.appendChild(pLabel);
    quantity.appendChild(qInput);
    deleteCont.appendChild(deleteLink);
    settings.appendChild(quantity);
    settings.appendChild(deleteCont);
    itemContent.appendChild(description);
    itemContent.appendChild(settings);
    article.appendChild(itemImg);
    article.appendChild(itemContent);
    document.getElementById("cart__items").appendChild(article);

    // Add delete event
    deleteLink.addEventListener("click", cbDel);
    qInput.addEventListener("change", cbChange);
}

function resetPrice(nPrice, nQt) {
    let totalPrice = document.getElementById("totalPrice");
    let totalQuantity = document.getElementById("totalQuantity");

    totalPrice.innerText = nPrice;
    totalQuantity.innerText = nQt;
}

(async () => {
    await fetch("http://localhost:3000/api/products").then((res) => {
        return res.json();
    }).then((data) => {
        let totalPrice = document.getElementById("totalPrice");
        let totalQuantity = document.getElementById("totalQuantity");
        if (getCookie("cart")) {
            let cart = JSON.parse(getCookie("cart"));
            let finalPrice = 0;
            let finalQuantity = 0;
            let prod;
            for (let i in cart) {
                prod = data.find((v) => {
                    return v._id === cart[i].id;
                });
                if (prod) {
                    finalPrice += Number(prod.price) * Number(cart[i].qt);
                    finalQuantity += Number(cart[i].qt);
                    insertElement({...prod, ...cart[i]}, (e) => {
                        let elt = e.target.parentNode.parentNode.parentNode.parentNode;
                        let id = elt.dataset.id;
                        let color = elt.dataset.color;
                        if (id && color) {
                            prodQt = cart.find((v) => {
                                return v.id === id && v.color === color;
                            }).qt;
                            cart = cart.filter((v) => {
                                return !(v.id === id && v.color === color);
                            });
                            prodPrice = data.find((v) => {
                                return v._id === id;
                            }).price;
                            finalPrice -= prodPrice * prodQt;
                            finalQuantity -= prodQt;
                            setCookie("cart", JSON.stringify(cart));
                            elt.remove();
                            resetPrice(finalPrice, finalQuantity);
                        }
                    }, (e) => {
                        let prodPrice;
                        let elt = e.target.parentNode.parentNode.parentNode.parentNode;
                        let id = elt.dataset.id;
                        let color = elt.dataset.color;
                        if (id && color) {
                            prodPrice = data.find((v) => {
                                return v._id === id;
                            }).price;
                            prod = cart.find((v) => {
                                return v.id === id && v.color === color;
                            });
                            finalQuantity = (finalQuantity - prod.qt) + Number(e.target.value);
                            finalPrice = (finalPrice - (prod.qt * prodPrice)) + (Number(e.target.value) * prodPrice);
                            prod.qt = e.target.value;
                            resetPrice(finalPrice, finalQuantity);
                            setCookie("cart", JSON.stringify(cart));
                        }
                    });
                }
            }
            totalQuantity.innerText = finalQuantity;
            totalPrice.innerText = finalPrice + ",00";
        }
    });
})();