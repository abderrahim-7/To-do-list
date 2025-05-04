const user_field = document.getElementById("username");
const pass_field = document.getElementById("password");
const login_button = document.getElementById("login_button");

login_button.addEventListener('click',function(){
    const username = user_field.value;
    const password = pass_field.value;
    fetch("/login",{
        method : 'POST',
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
        console.log('Response from server:', data)
        if (data.success == false){
            alert("username or password incorrect !!")
        }
        else{
            window.location.href = "/Task";
        }
    })
    .catch(error => console.error('Error:', error));
})