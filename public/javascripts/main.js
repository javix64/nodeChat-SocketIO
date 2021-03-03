var socket = io();
var form = document.getElementById('form');
var input = document.getElementById('input');
var inputUser = document.getElementById('inputUser');
let username = "Anónimo";
//save user into variable
let bUser= document.getElementsByClassName('bUser')[0];
let isBold=false;
let getColor= document.getElementsByClassName('color')[0];
let boldClass= document.getElementsByClassName('bold')[0];
let bold= document.getElementById('bold');

bold.addEventListener('click',(e)=>{
  if(e.currentTarget.className=="bold"){
    e.currentTarget.className="Nbold";
    bold.style.fontWeight="normal";
  } 
  else{
    e.currentTarget.className="bold";
    bold.style.fontWeight="900";
  }

  isBold=!isBold;
})


function setUser(){
    username=inputUser.value;
    console.log(username);
}
inputUser.addEventListener('keyup',setUser);
//close modal and save user
bUser.addEventListener('click',function(){
    username=inputUser.value;
    console.log(username)
    modal.style.display="none"
})



//get message from input, and send message
form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    let msg = {
      msg: input.value,
      user: username,
      bold:isBold,
      color:getColor.value
    };
    socket.emit('chat message', msg);
    input.value = '';
  }
});

//append message
socket.on('chat message', function(msg) {
  var item = document.createElement('li');
  item.textContent = `${msg.user} : ${msg.msg}`;
  item.style.color=msg.color;
  if(msg.bold){item.style.fontWeight="bold"}
  
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
// MODAL 

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
window.onload = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}