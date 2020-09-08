// deklarasi variable DOM
const input = document.getElementById('input'), // memasukan Element DOM kedalam variable input
      buttonadd = document.getElementById('add'), // memasukan Element DOM kedalam variable buttonadd
      list = document.getElementById('lists'), // memasukan Element DOM kedalam variable list
// akhir dari deklarasi variable DOM

      data = storage('todo'); // ngambil data dari storage
      
let todo = data ? data : []; // deklarasi variable todo, masukan data jika ada data jika data array kosong

buttonadd.addEventListener('click', add);

// ini fungsi untuk nambahin data
function add(){
  let val = input.value; //ngambil value dari DOM input
  todo.push({
      text: val, // data inputan
      date: new Date(), // data tanggal waktu input
      completed: false, // data kondisi komplit
  }) // memasukan data kedalam array dari belakang
  storage('todo', todo, true); //nambahin data ke storage
  show();
}
// akhir fungsi data

// ini fungsi untuk ngecek apakah todo punya isi gak
if(todo.length){
    show();
}

// ini fungsi untuk menampilkan kedalam HTML
function show(){
  list.innerHTML = ""; // set innerHTML DOM list menjadi kosong

  // looping untuk nampilin list
  // let i = 0 deklarasi start number
  for (let i = 0; i < todo.length; i++) {
      todo[0].date = new Date(todo[0].date); // convert date string ke format date
      // menambahkan semua element dalam backthick (template literal) ke dalam innerHTML sebelumnya
      list.innerHTML +=
      `<li>
          ${todo[i].completed ? '<s>' : ''}${todo[i].text} | ${todo[i].date}${todo[i].completed ? '</s>' : ''} 
          <button onclick="remove(${i})">🗑️</button>
          <button onclick="edit(${i}, event)">✏️</button>
          <button onclick="completeTask(${i}, event)">✔️</button>
      </li>`
  }
}
// akhir dari fungsi menampilkan kedalam HTML

// fungsi edit untuk mengubah list yang di edit menjadi input text
function edit(index, event){
    let elem = event.target.parentNode; // event target membaca element apa yang di click, event target parentNode membaca parent dari element yang di klik
    elem.innerHTML = `<input type="text" onkeypress="done(${index}, event)">` //mengubah list menjadi sebuah input dengan menambahkan fungsi done dan aktif ketika papan ketik di tekan
}
//akhir dari fungsi edit

// fungsi done untuk melakukan perubahan atau penetapan data pada storage dan menampilkan ulang data tersebut
function done(index, event){
    if (event.which == 13) { // event which 13 adalah tombol enter
        todo[index].text = event.target.value; // ini untuk mengisi key text pada  objek todo di index yang dituju
        storage('todo', todo, true); // menyimpan data pada local storage dengan fungsi storage 
        show(); // menampilkan ulang data
    }
}
//akhir dari fungsi done

// fungsi remove untuk menghapus data berdasarkan index dari data tersebut
function remove(index){
    console.log('remove index', index); // menampilkan pesan pada console log "remove index X"
    todo.splice(index, 1); // metode pada array untuk membuang array pada index tertentu sebanyak 1 kali
    storage('todo', todo, true); // menyimpan data pada local storage dengan fungsi storage
    show(); // menampilkan ulang data
}
// akhir dari fungsi done

function completeTask(index){
  todo[index].completed = true; // mengubah kondisi completed pada array objek todo menjadi true agar tercoret pada tampilan
  storage('todo', todo, true); // menyimpan data pada local storage dengan fungsi storage
  show(); // menampilkan ulang data
}

function storage(name, data = null, set = false){
  if(set){ // jika set kondisi true
      localStorage.setItem(name, JSON.stringify(data)); // melakukan penetapan pada localstorage browser dengan variable/property yang ditunjukan oleh variable "name" dan data yang diterima di konversi kedalam bentuk JSON
      return true; 
  }else{ // kondisi false
      return JSON.parse(localStorage.getItem(name)); // melakukan pengambilan data pada local storage berdasarkan variable yang ditunjukan oleh variable "name" yang kemduian di konversi kedalam bentuk JSON lagi (Objek)
  }
}