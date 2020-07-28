const dateElement = document.getElementById("date");
const input = document.getElementById("input");
const list = document.getElementById("list");

const valide = "fa-check-square";
const invalide = "fa-square-o";
const Fini = "fini";

let LIST, id;

let data = localStorage.getItem("TODO");

if(data){
    LIST = JSON.parse(data);
    id = LIST.length; 
    loadList(LIST); 
}else{
    LIST = [];
    id = 0;
}

const date = {weekday : "long", month:"long", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("fr", date);

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

function addToDo(toDo, id, done, trash){

    if(trash){ return; }
    
    const DONE = done ? valide : invalide;
    const LINE = done ? Fini : "";
    
    const item = `<li class="item">
                    <i class="fa ${DONE} co" tache="acheve" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-times de" tache="supprimer" id="${id}"></i>
                  </li>
                `;
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
}

document.addEventListener("keyup",function(even){
    if(event.keyCode === 13){
        const toDo = input.value;
        
        if(toDo){
            addToDo(toDo, id, false, false);
            
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        }
        input.value = "";
    }
});

function acheveToDo(element){
    element.classList.toggle(valide);
    element.classList.toggle(invalide);
    element.parentNode.querySelector(".text").classList.toggle(Fini);
    
    LIST[element.id].done = !LIST[element.id].done;
}


function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

list.addEventListener("click", function(event){
    const element = event.target; 
    const elementtache = element.attributes.tache.value; 
    
    if(elementtache === "acheve"){
        acheveToDo(element);
    }else if(elementtache === "supprimer"){
        removeToDo(element);
    }

    localStorage.setItem("TODO", JSON.stringify(LIST));
});