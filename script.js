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
                <button id="removeItem" noIndex="${i}" onclick="this.remove(${i})">🗑️</button>
                <button id="editItem" noIndex="${i}" onclick="edit(${i}, event)">✏️</button>
                <button id="completeItem" noIndex="${i}" onclick="completeTask(${i}, event)">${completed ? "❌" : "✔️"}</button>
            </li>`
        }
        let remove = document.querySelectorAll('#removeItem');
        let complete = document.querySelectorAll('#completeItem');
        let editItem = document.querySelectorAll('#editItem');

        remove.forEach(item => {
            // parentElement.removeChild(item.parentNode)
            item.onclick = () => {
                console.log(item.getAttribute("class"));
                console.log(item.getAttribute("aqua"));
                this.data.splice(item.getAttribute("noIndex"),1);
                this.storage('todo',this.data,true);
                this.show()
            }
        })

        complete.forEach(item => {
            item.onclick = () => {
                let complete = this.data[item.getAttribute("noIndex")].completed;
                this.data[item.getAttribute("noIndex")].completed = complete ? false : true
                this.storage('todo', this.data, true); // menyimpan data pada local storage dengan fungsi storage
                this.show(); // menampilkan ulang data
            }
        })


        editItem.forEach(item => {
            item.onclick = () => {
                let elem = item.parentNode; // event target membaca element apa yang di click, event target parentNode membaca parent dari element yang di klik
                elem.innerHTML = `<input type="text" noIndexDone="${item.getAttribute("noIndex")}">`
                elem.onkeypress = () => {
                    this.done(event)
                }
            }
        })
    }

    done(datainput){
        if (datainput.which == 13) { // event which 13 adalah tombol enter
            this.data[datainput.target.getAttribute('noindexdone')].text = datainput.target.value; // ini untuk mengisi key text pada  objek todo di index yang dituju
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