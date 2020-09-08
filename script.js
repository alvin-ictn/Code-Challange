// const input = document.getElementById('input'),
//       buttonadd = document.getElementById('add'),
//       list = document.getElementById('lists'),
//       buttonsort = document.getElementById('sort');

// let todo = [];

// buttonadd.addEventListener('click', add);

// if(todo.length){
//     show();
// }

// function show(){
//     list.innerHTML = "";
//     for (let i = 0; i < todo.length; i++) {
//         item.date = new Date(item.date);
//         list.innerHTML += `<li>${item.text} | ${item.date}${item.completed}</li>`
//     }
// }
// function add(){
//     let val = input.value;
//     todo.push({
//         text: val,
//         date: new Date(),
//         completed: false,
//     })
//     show();
// }

// change all of this to jquery code

const input = $('#input');
      buttonadd = $('#add');
      list = $('#lists');
      buttonsort = $('#sort');


let todo = [];

buttonadd.on('click', add);

if(todo.length) show();


function show(){
   let render = "";
    for(item of todo) {
        item.date = new Date(item.date);
        render += `<li>${item.text} | ${item.date}${item.completed}</li>`
    }
    list.html(render)
}

function add(){
    let value = input.val();
    todo.push({
        text: input.val(),
        date: new Date(),
        completed: false,
    })
    show();
    input.val("")
}