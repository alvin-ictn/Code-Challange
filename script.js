const input = document.getElementById("input"), // ambil element input disimpan dalam variable input
      buttonadd = document.getElementById("add"), // ambil element add disimpan dalam variable buttonadd
      lists = document.getElementById("lists"); // ambil element lists disimpan dalam variable lists

let todo = []; // kita simpan data yang kita input di array todo 

show();

buttonadd.addEventListener('click', add); // ketika button dengan id="add" di klik akan run fungsi add

function show(){ // fungsi show() untuk menampilkan data dari todo
    lists.innerHTML = ""; // reset html jadi kosong 
    for(let i = 0; i < todo.length; i++){ // looping / perulangan ketika data dari todo tidak kosong
        todo[i].date = new Date(todo[i].date);
        lists.innerHTML += `
        <li>${todo[i].completed ? '<s>' : ''}${todo[i].text} | ${todo[i].date}${todo[i].completed ? '</s>' : ''}
        </li>` // membuat element li baru dari data di todo
    }
}

function add(){ // fungsi add() untuk menambahkan data ke todo --> dipanggil ketika klik button id="add"
    let val = input.value; // ambil data / value / hasil dari input di todo
    todo.push({ // menambahkan data ke array todo dari value input
        text : val, // text yang di tampilkan
        date : new Date(), // display date
        completed : false, //state untuk todo itu sudah selesai atau belum
    });
    show(); // memanggil fungsi show untuk menampilkan data yang sudah di tambahkan
    input.value = "";
}
