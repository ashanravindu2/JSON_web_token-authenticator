function userRegistration() {
  event.preventDefault();

  //define variables
  var name = $('#name').val();
  var email = $('#email').val();
  var password = $('#password').val();

  console.log({
    name: name,
    email: email,
    password: password
  });

  //create ajax request
  $.ajax({
    url: 'http://localhost:8080/api/v1/auth/register',
    method: 'POST',
    contentType: "application/json",
    "data":JSON.stringify({
      name: name,
      email: email,
      password: password
    }),
    // error handling
    success: function(response) {
      console.log(response);
      localStorage.setItem('token', response.data.token)
      clearFields();
      alert(response.message);
    },
    error: function(error) {
      console.log(error);
      alert(error.responseJSON.message);
    }
  });

}

function clearFields() {
  $('#name').val('');
  $('#email').val('');
  $('#password').val('');
}

function userLogin() {
  event.preventDefault();

  //define variables
  var email = $('#email').val();
  var password = $('#password').val();

  console.log({
    email: email,
    password: password
  });

  //create ajax request
  $.ajax({
    url: 'http://localhost:8080/api/v1/auth/authenticate',
    method: 'POST',
    contentType: "application/json",
    "data":JSON.stringify({
      email: email,
      password: password
    }),
    // error handling
    success: function(response) {
      console.log(response);
      localStorage.setItem('token', response.data.token)
      clearFields();
      alert(response.message);
      window.location.href ="../dashboard.html";
    },
    error: function(error) {
      console.log(error);
      alert(error.responseJSON.message);
    }
  });
}

//remove token from local storage
function logout() {
  event.preventDefault();

  localStorage.removeItem('token');
  alert('You have successfully logged out');
  window.location.href ="../signIn.html";

}

//console print client response
$(document).ready(function (){
  let token = localStorage.getItem("token");
  if (token){
    $.ajax({
      url:"http://localhost:8080/api/v1/blog/newMethod",
      method:"GET",
      contentType:"application/json",
      header:{
        "Authorization":`Bearer +token`
      },
      success:function (response){
        console.log(response)
        $('/p'+response+'</p>').appendTo('body')
      },
      error:function (error){
        console.log(error)
      }
    })
  }
})
