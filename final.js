function getList(key) {
    var data = localStorage.getItem(key);
    if (data == null) {
        return [];
    }
    return JSON.parse(data);
}

function saveList(key, list) {
    localStorage.setItem(key, JSON.stringify(list));
}

var cards = document.querySelectorAll(".product-card");

for (var i = 0; i < cards.length; i++) {
    setupCard(cards[i]);
}

function setupCard(card) {
    var cartBtn = card.querySelector(".add-cart");
    var favBtn = card.querySelector(".add-fav");
    if (cartBtn == null && favBtn == null) {
        return;
    }

    var product = {
        id: card.dataset.id,
        name: card.dataset.name,
        price: Number(card.dataset.price),
        img: card.dataset.img
    };

    cartBtn.addEventListener("click", function () {
        var cart = getList("cart");
        var found = false;

        for (var j = 0; j < cart.length; j++) {
            if (cart[j].id == product.id) {
                cart[j].qty = cart[j].qty + 1;
                found = true;
            }
        }

        if (found == false) {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                img: product.img,
                qty: 1
            });
        }

        saveList("cart", cart);

  
        cartBtn.textContent = "✓";
        setTimeout(function () {
            cartBtn.textContent = "+";
        }, 800);
    });

    var fav = getList("favorites");
    for (var k = 0; k < fav.length; k++) {
        if (fav[k].id == product.id) {
            favBtn.textContent = "♥";
        }
    }

    favBtn.addEventListener("click", function () {
        var fav = getList("favorites");
        var index = -1;

        for (var j = 0; j < fav.length; j++) {
            if (fav[j].id == product.id) {
                index = j;
            }
        }

        if (index == -1) {
            // товара нет, добавляем
            fav.push(product);
            favBtn.textContent = "♥";
        } else {
            // товар уже есть, удаляем
            fav.splice(index, 1);
            favBtn.textContent = "♡";
        }

        saveList("favorites", fav);
    });
}

var categoryLinks = document.querySelectorAll(".categories a");

function showCategory(name) {
    for (var i = 0; i < cards.length; i++) {
        if (cards[i].dataset.category == name) {
            cards[i].style.display = "block";
        } else {
            cards[i].style.display = "none";
        }
    }
}


if (categoryLinks.length > 0) {

    for (var i = 0; i < categoryLinks.length; i++) {
        categoryLinks[i].addEventListener("click", function (event) {
            event.preventDefault();

            for (var j = 0; j < categoryLinks.length; j++) {
                categoryLinks[j].classList.remove("selected");
            }

            this.classList.add("selected");

            showCategory(this.dataset.category);
        });
    }


    showCategory("coffee");
}