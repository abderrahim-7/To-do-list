const user_field = document.getElementById("username")
const pass_field = document.getElementById("password")
const button = document.getElementById("Register_button")

button.addEventListener("click",function(){
    const username = user_field.value;
    const password = pass_field.value;

    fetch("/SignUP",{
        method : "POST",
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ 
            username: username, 
            password: password 
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.success == true){
            window.location.href = "/Task";
        }
        else{
            alert(data.reason)
        }
    })
    .catch(error => console.error('Error:', error));
})