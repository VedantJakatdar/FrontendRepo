document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "admin" && password === "Golu@2911") {
      window.location.href = "homePage.html"; 
    } else {
      alert("Wrong username or password!");
    }
  });