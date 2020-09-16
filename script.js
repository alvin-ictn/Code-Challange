const input = document.getElementById('input'),
      buttonadd = document.getElementById('add'),
      list = document.getElementById('lists');

class Todo {
    constructor(){
        this.data =  this.storage('todo') || [];
        this.show();
    }
    
    show(){
        list.innerHTML = "";
        for (let i = 0; i < this.data.length; i++) {
            // this.data[i].completed = true;
            const {text, date, completed} = this.data[i];

            // todo
            list.innerHTML += `
            <li>${i + 1}. ${text} | ${date} | ${completed}
                <button id="removeItem" noIndex="${i}" onclick="todo.remove(${i})">🗑️</button>
                <button id="editItem" noIndex="${i}" onclick="todo.edit(${i}, event)">✏️</button>
                <button id="completeItem" noIndex="${i}" onclick="todo.completeTask(${i}, event)">${completed ? "❌" : "✔️"}</button>
            </li>`
        }
    }

    remove(index){
        this.data.splice(index,1);
        this.storage('todo',this.data,true);
        this.show()
    }

    completeTask(index,event){
        let complete = this.data[index].completed;
        this.data[index].completed = complete ? false : true
        this.storage('todo', this.data, true); // menyimpan data pada local storage dengan fungsi storage
        this.show(); // menampilkan ulang data
    }

    edit(index,event){
        let elem = event.target.parentNode; // event target membaca element apa yang di click, event target parentNode membaca parent dari element yang di klik
        elem.innerHTML = `<input type="text" onkeypress="todo.done(${index}, event)">` //mengubah list menjadi sebuah input dengan menambahkan fungsi done dan aktif ketika papan ketik di tekan
    }

    done(index,event){
        if (event.which == 13) { // event which 13 adalah tombol enter
            this.data[index].text = event.target.value; // ini untuk mengisi key text pada  objek todo di index yang dituju
            this.storage('todo', this.data, true); // menyimpan data pada local storage dengan fungsi storage 
            this.show(); // menampilkan ulang data
        }
    }

    setTodo(value){
        console.log(this.data)
        this.data.push(
            {
                text: value,
                date: new Date(),
                completed: false,
            }
        )
        this.storage('todo',this.data,true);
        this.show()
    }

    storage(name, data = null, set = false){
        if(set){ // jika set kondisi true
            localStorage.setItem(name, JSON.stringify(data)); // melakukan penetapan pada localstorage browser dengan variable/property yang ditunjukan oleh variable "name" dan data yang diterima di konversi kedalam bentuk JSON
            return true; 
        }else{ // kondisi false
            return JSON.parse(localStorage.getItem(name)); // melakukan pengambilan data pada local storage berdasarkan variable yang ditunjukan oleh variable "name" yang kemduian di konversi kedalam bentuk JSON lagi (Objek)
        }
      }
};

let todo = new Todo;

buttonadd.addEventListener('click', () => todo.setTodo(input.value));