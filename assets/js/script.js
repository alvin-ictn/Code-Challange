const cacheKey = "URL"

let listNode, 
    toDoList, 
    getNumber, 
    inputTaskElement = document.getElementById('inputTask'),
    button = document.querySelector('button[type="submit"]');
    
const textNodeElement = text => {
  text.length ? text : text = 'NO TEXT'
  let textNode = document.createElement('a');
  textNode.className="item";
  textNode.appendChild(document.createTextNode(text));
  textNode.setAttribute('contenteditable',"true")
  return textNode
}

const editElement = () => {
  if(event.target.getAttribute("status") == "active"){
    event.target.setAttribute("status","inactive");
    event.target.parentElement.children[1].setAttribute('contenteditable',"true")
    event.target.parentElement.children[1].classList.remove('task-done')
  }else{
    event.target.setAttribute("status","active");
    event.target.parentElement.children[1].setAttribute('contenteditable',"false")
    event.target.parentElement.children[1].classList.add('task-done')
  }
}

const inputNodeElement = () => {
  let inputNode = document.createElement('input');
  inputNode.className ='checkboxClass';
  inputNode.type = "checkbox";
  inputNode.addEventListener('click',editElement)
  return inputNode
}

const removeElement = () => {
  toDo = document.getElementById('toDo');
    let data = event.target.parentElement;
    toDo.removeChild(data)
    sessionStorage.setItem(cacheKey,toDo.innerHTML)
}

const deleteNodeElement = () => {
  let deleteNode = document.createElement('a');
  deleteNode.className = "action";
  deleteNode.appendChild(document.createTextNode("❌"))
  deleteNode.addEventListener('click',removeElement)
  return deleteNode
}

button.addEventListener('click',()=> {
  listNode = document.createElement('li');
  toDoList = document.getElementById('toDo');
  getNumber = toDoList.lastElementChild ? toDoList.lastElementChild.id : 0 
  listNode.id = parseInt(getNumber) + 1;
  listNode.appendChild(inputNodeElement());
  listNode.appendChild(textNodeElement(inputTaskElement.value));
  listNode.appendChild(deleteNodeElement());
  toDoList.append(listNode);
  toDo = document.getElementById('toDo');
  console.log(toDo)
  sessionStorage.setItem(cacheKey,toDo.innerHTML)
  inputTaskElement.value = '';
})


if (typeof(Storage) !== "undefined") {
  if (sessionStorage.getItem(cacheKey) === "undefined") {
    sessionStorage.setItem(cacheKey, 0);
  }

  const button = document.querySelector("#button");
  const count = document.querySelector("#count");
  window.onload = function() {
    toDo.innerHTML = sessionStorage.getItem(cacheKey)
    let toDoAct = document.getElementById('toDo').children
    
    for(element of toDoAct){
      element.children[2].addEventListener('click',removeElement)
      element.children[0].addEventListener('click',editElement)
    }

  }
} else {
  console.error("GAK ADA")
}