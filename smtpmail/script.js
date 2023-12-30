const form = document.form; //slect form using formname
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
//const subject = document.getElementById("subject");
const subjectElement = document.getElementById("subject");
const subjectValue = subjectElement ? subjectElement.value : "";

const message = document.getElementById("message");
//smtp mail funtion
function sendEmail() {
  const bodyMsg = `Full Name : ${fullName.value}<br>
                  Email :${email.value}<br>
                 Phone Number : ${phone.value}<br>
                Subject : ${subject.value}<br>
               message : ${message.value}<br>`;

  Email.send({
    SecureToken: "97c1703c-cbfa-49c5-8755-d4a05a1d75ea",
    To: ["muhammadhabeebrahmam@gmail.com", "projectpurpose.mine@gmail.com"],
    From: "projectpurpose.mine@gmail.com",
    //Subject: "NEW SUBMITON ON SMTP FORM"+subject.value,
    Subject: "NEW SUBMITON ON SMTP FORM " + subjectValue,
    Body: bodyMsg,
  }).then((message) => {
    if ((message = "OK")) {
      Swal.fire({
        title: "Success!",
        text: "Message send successfully!",
        icon: "success",
      });
    }
  });
}
//check inputs

function checkInputs() {
  const items = document.querySelectorAll(".item");

  for (const item of items) {
    if (item.value.trim() === "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }
    //email chekking loop
    if (items[1].value.trim() != "") {
      checkEmail();
    }
    item.addEventListener("keyup", () => {
      checkEmail();
    });
    //over email loop
    item.addEventListener("input", () => {
      if (item.value.trim() != "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      } else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }
}
// over input chekking
// /cheking email function

function checkEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const errortextEmail = document.querySelector(".error-txt.email");

  if (!email.value.match(emailRegex)) {
    email.classList.add("error");
    email.parentElement.classList.add("error");
    if (email.value.trim() != "") {
      errortextEmail.innerHTML = "Enter a valid email";
    } else {
      errortextEmail.innerHTML = "Email can't be blank ";
    }
  } else {
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
  }
}

// over email chekking
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
  if (
    !fullName.classList.contains("error") &&
    !email.classList.contains("error") &&
    !phone.classList.contains("error") &&
    !subjectElement.classList.contains("error") &&
    !message.classList.contains("error")
  ) {
    sendEmail();
    form.reset();
    return false;
  }
});
