const input = document.getElementById("input"), // ambil element input disimpan dalam variable input
      buttonadd = document.getElementById("add"), // ambil element add disimpan dalam variable buttonadd
      lists = document.getElementById("lists"); // ambil element lists disimpan dalam variable lists

let todo = [],  // kita simpan data yang kita input di array todo 
    mode = "set", // setMode
    todoId; // temp id

buttonadd.addEventListener('click', function(e){
  e.preventDefault();
  if(mode=="set"){ // saat mode set
    add(); // jalankan fungsi add
  }else{ // saat mode edit
    editAction(); // jalankan fungsi edit
    mode = "set"; // ubah kembali mode ke set
    buttonadd.innerHTML = "Add"; // ubah label tombol ke add
    todoId = null; // kosongkan variable todoId
  }
  input.value = ""
}); // ketika button dengan id="add" di klik akan run fungsi add

function show(){ // fungsi show() untuk menampilkan data dari todo
    lists.innerHTML = ""; // reset html jadi kosong 
    for(let i = 0; i < todo.length; i++){ // looping / perulangan ketika data dari todo tidak kosong
        lists.innerHTML += `
        <li>${todo[i].completed ? '<s>' : ''}${todo[i].text} | ${todo[i].date}${todo[i].completed ? '</s>' : ''}
          <button onclick='edit(${i},event)'>✏️</button>
          <button onclick='remove(${i})'>🗑️</button>
        </li>` // membuat element li baru dari data di todo
    }
}

function add(){ // fungsi add() untuk menambahkan data ke todo --> dipanggil ketika klik button id="add"
    let val = input.value; // ambil data / value / hasil dari input di todo
    todo.push({ // menambahkan data ke array todo dari value input
        text:val, // text yang di tampilkan
		date: new Date(),
        completed:false //state untuk todo itu sudah selesai atau belum
    });
    show(); // memanggil fungsi show untuk menampilkan data yang sudah di tambahkan
}

function editAction(){ // fungsi merubah isi dari array todo
    todo[todoId].text = input.value; // mengubah isi key text pada objek todo yang memiliki index ke-x dengan input value
    show(); // menampilkan ulang data
}

function edit(index){ // fungsi untuk menginisialisasi proses edit
  input.value = todo[index].text; // mengisi kotak input dengan list yang ada
  buttonadd.innerHTML = "Edit"; // mengubah text pada tombol menjadi edit
  mode = "edit"; // mengubah mode ke edit
  todoId = index; // mengisi id dengan index
  show(); // menampilkan ulang data
}

function remove(index){ // fungsi remove untuk menghapus data berdasarkan index dari data tersebut
    todo.splice(index,1) // metode pada array untuk membuang array pada index tertentu sebanyak 1 kali
    show(); // menampilkan ulang data
}
