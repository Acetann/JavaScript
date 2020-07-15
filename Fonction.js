const ul = document.getElementById("myUl");

function add() {
    const item = document.getElementById("newItem").value;
    const itemTxt = document.createTextNode(item);
    const li = document.createElement("li");
    const btn = document.createElement("button");
    const btnx = document.createTextNode("x");
    btn.setAttribute("onclick", "remove()");
    btn.appendChild(btnx);
    li.appendChild(itemTxt);
    li.appendChild(btn);
    ul.appendChild(li);
    localStorage["Liste"] = ul.innerHTML
}

function remove() {
    const task = this.event.currentTarget.parentNode;
    ul.removeChild(task);
    localStorage["Liste"] = ul.innerHTML // updating localstorage
}

if (localStorage["Liste"]) {
    ul.innerHTML = localStorage["Liste"];
}
