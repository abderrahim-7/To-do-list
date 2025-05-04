

let task = document.getElementsByTagName("LI")
let close = document.getElementsByClassName("close")
let list = document.querySelector('UL')
let inputText = document.getElementById("myInput")
let logoutButton = document.getElementById("logout")
let time = document.getElementById("time")
let date = document.getElementById("Date")

for (let i = 0; i<task.length; i++){
    let delete_button = document.createElement("button")
    delete_button.className = 'close'
    delete_button.textContent = "Delete"
    task[i].appendChild(delete_button)
}


document.addEventListener("click", function (event) {
    if (event.target.classList.contains("close")) {
        const parent = event.target.parentElement;
        const taskName = parent.textContent.replace("Delete", "").trim();
        deleteTask(taskName);
        parent.style.display = "none";
    }
});


for (let i=0;i<task.length;i++){
    task[i].addEventListener("click",function(){
        task[i].classList.toggle("checked");
    })
}

document.addEventListener("click",function(event){
    if (event.target.tagName.toLowerCase() == 'li'){
        const taskName = event.target.textContent.replace("Delete", "").trim();
        checkTask(taskName)
    }
})

document.addEventListener("click",function(event){
    if (event.target.id == "logout"){
        fetch("/logout",{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success == true){
                window.location.href = "/";
            }
        })
        .catch(error => console.error('Error:', error));
    }
})


let newTask = function(){
    let text = inputText.value

    if (text == ''){
        alert('there is no text !!!')
    }
    else{

        fetch("/addTask",{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ 
                taskName: text, 
                taskStatus: false 
            })
        })
        .then(response => response.json())
        .then(data => console.log('Response from server:', data))
        .catch(error => console.error('Error:', error));

        let new_task = document.createElement('LI')
        new_task.textContent = text
        new_task.addEventListener('click',function(){
            new_task.className.toggle('checked')
        })
        let delete_button = document.createElement("button")
        delete_button.className = "close"
        delete_button.textContent = "Delete"
        delete_button.addEventListener('click',function(){
            const parent = delete_button.parentElement
            parent.style.display = 'none'
        })
        new_task.appendChild(delete_button)
        list.appendChild(new_task)
        inputText.value = ''
    }
}

let loadTask = function(taskName,taskStatus){
    let text = taskName

    let new_task = document.createElement('LI')
    new_task.textContent = text

    if (taskStatus){
        new_task.classList.add('checked')
    }

    new_task.addEventListener('click',function(){
        new_task.classList.toggle('checked')
    })
    let delete_button = document.createElement("button")
    delete_button.className = "close"
    delete_button.textContent = "Delete"
    delete_button.addEventListener('click',function(){
        const parent = delete_button.parentElement
        parent.style.display = 'none'
    })
    new_task.appendChild(delete_button)
    list.appendChild(new_task)
}

let deleteTask = function(taskName){
    console.log("Attempting to delete task:", taskName);
    fetch(`/deleteTask/${encodeURIComponent(taskName)}`,{
        method : "DELETE",
    })
    .then(response => response.json())
    .then(data => console.log("Response from server:", data))
    .catch(error => console.error("Error:", error));
}

let checkTask = function(taskName){
    fetch("/checkTask",{
        method : "PUT",
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            task : taskName
        })
    })
    .then(response => response.json())
    .then(data => console.log('Response from server:', data))
    .catch(error => console.error('Error:', error));
}

fetch("/showTask")
.then(response => response.json())
.then(tasks => {
    tasks.forEach(task => {
        loadTask(task.task,task.state)
    })
})



