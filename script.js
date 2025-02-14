document.getElementById('registrationType').addEventListener('change', function() {
  const groupSizeContainer = document.getElementById('groupSizeContainer');
  if (this.value === 'group') {
      groupSizeContainer.style.display = 'block';
  } else {
      groupSizeContainer.style.display = 'none';
  }
});

document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const registrationType = document.getElementById('registrationType').value;
  const groupSize = registrationType === 'group' ? parseInt(document.getElementById('groupSize').value) : 1;

  if (registrationType === 'group' && (groupSize < 1 || groupSize > 20)) {
      alert('Group size must be between 1 and 20.');
      return;
  }

  const passcode = generatePasscode();
  const discount = calculateDiscount(registrationType, groupSize);

  sendPasscode(email, passcode, discount);

  document.getElementById('message').innerText = `Registration successful! Check your email for the passcode.`;
  document.getElementById('registrationForm').reset();
});

function generatePasscode() {
  return Math.random().toString(36).substr(2, 8).toUpperCase();
} 

function calculateDiscount(registrationType, groupSize) {
  if (registrationType === 'group') {
      return '30%';
  } else {
      // Simulate the first 10 individual registrants getting a 10% discount
      const individualCount = getIndividualCount();
      if (individualCount < 10) {
          return '10%';
      } else {
          return '0%';
      }
  }
}

function sendPasscode(email, passcode, discount) {
  // Simulate sending an email
  console.log(`Email sent to ${email} with passcode: ${passcode} and discount: ${discount}`);
  // In a real scenario, you would use an email service to send the email
}

let individualCount = 0;
function getIndividualCount() {
  return ++individualCount;
}

// Frontend (HTML/JS for interactivity)
let menu = document.querySelector("#menu-bars");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

let themeToggler = document.querySelector(".theme-toggler");
let toggleBtn = document.querySelector(".toggle-btn");

toggleBtn.onclick = () => {
  themeToggler.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
  themeToggler.classList.remove("active");
};

document.querySelectorAll(".theme-toggler .theme-btn").forEach((btn) => {
  btn.onclick = () => {
    let color = btn.style.background;
    document.querySelector(":root").style.setProperty("--theme-color", color);
  };
});

var swiper = new Swiper(".home-slider", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2,
    slideShadows: true,
  },
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  }
});

var swiper = new Swiper(".review-slider", {
  slidesPerView: 1,
  grabCursor: true,
  loop: true,
  spaceBetween: 10,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    700: {
      slidesPerView: 2,
    },
    1050: {
      slidesPerView: 3,
    },
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});

let attendees = [];
        let generalTicketCount = 0;

        // Prices
        const prices = {
            VIP: 300,
            General: 200,
            Group: 600
        };

        // Discounts
        const discount = 0.3; // 30% discount for all tickets
        const generalDiscountFirst10 = 0.1; // 10% discount for the first 10 general tickets

        function calculateDiscountedPrice(ticketType) {
            let price = prices[ticketType];

            // Check for General ticket special condition
            if (ticketType === 'General' && generalTicketCount < 10) {
                price -= price * generalDiscountFirst10; // Apply 10% discount for first 10 general tickets
            }

            // Apply 30% discount
            price -= price * discount;

            return price;
        }

        function buyTicket(ticketType) {
          let discountedPrice = calculateDiscountedPrice(ticketType);
      
          // Update General ticket count if it's General
          if (ticketType === 'General') {
              generalTicketCount++;
          }
      
          // Create attendee record
          let attendee = {
              ticketType: ticketType,
              price: discountedPrice.toFixed(2),
              passcode: generatePasscode() // Generate passcode for each attendee
          };
      
          // Add to attendees list
          attendees.push(attendee);
      
          // Show confirmation message
          document.getElementById("confirmation-message").innerText = `${ticketType} Ticket Purchased for $${discountedPrice.toFixed(2)}! Passcode: ${attendee.passcode}`;
      
          // Update attendees list display
          updateAttendeesList();
      }
      
        function updateAttendeesList() {
          let attendeesList = document.getElementById("attendees-list");
          attendeesList.innerHTML = ""; // Clear previous list
      
          attendees.forEach((attendee, index) => {
              let listItem = document.createElement("li");
              listItem.innerText = `Attendee ${index + 1}: ${attendee.ticketType} - $${attendee.price}, Passcode: ${attendee.passcode}`;
              attendeesList.appendChild(listItem);
          });
      }

      document.getElementById('reviewForm').addEventListener('submit', function(event) {
        event.preventDefault();
       
        // Get form values
        const name = document.getElementById('name').value;
        const rating = document.getElementById('rating').value;
        const comment = document.getElementById('comment').value;
       
        // Create review element
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
       
        reviewElement.innerHTML = `
            <h3>${name} - ${rating} Stars</h3>
            <p>${comment}</p>
        `;
       
        // Append review to the reviews list
        document.getElementById('reviewsList').appendChild(reviewElement);
       
        // Clear the form
        document.getElementById('reviewForm').reset();
    });

    // Handle Survey Form Submission
    document.getElementById('surveyForm').addEventListener('submit', function(event) {
        event.preventDefault();
       
        // Get form values
        const experience = document.getElementById('experience').value;
        const feedback = document.getElementById('feedback').value;
       
        // Create survey result element
        const surveyResultElement = document.createElement('div');
        surveyResultElement.classList.add('survey-result');
       
        surveyResultElement.innerHTML = `
            <h3>Experience Rating: ${experience}/5</h3>
            <p>${feedback}</p>
        `;
       
        // Append survey result to the survey results list
        document.getElementById('surveyResults').appendChild(surveyResultElement);
       
        // Clear the form
        document.getElementById('surveyForm').reset();
    });
    // Assuming you have a form with an ID 'registerForm' and a div with the class 'message' for showing messages

document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevents form submission to keep the page from refreshing
  
  // Simulating registration success
  const success = true;  // You would replace this with your actual validation logic
  
  const messageDiv = document.querySelector('.message');
  
  if (success) {
      messageDiv.classList.remove('error');
      messageDiv.classList.add('success');
      messageDiv.textContent = 'Registration successful!';
  } else {
      messageDiv.classList.remove('success');
      messageDiv.classList.add('error');
      messageDiv.textContent = 'There was an error with your registration.';
  }
  
  messageDiv.style.display = 'block';  // Show the message div
});
// Review Form Submission
document.getElementById("reviewForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevents the default form submission

  // Get form data (if needed)
  var name = document.getElementById("name").value;
  var rating = document.getElementById("rating").value;
  var comment = document.getElementById("comment").value;

  // After form submission, display the success message
  document.getElementById("reviewSuccessMessage").style.display = "block";

  // Optionally, clear the form after submission
  document.getElementById("reviewForm").reset();
});

// Survey Form Submission
document.getElementById("surveyForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevents the default form submission

  // Get survey data (if needed)
  var experience = document.getElementById("experience").value;
  var feedback = document.getElementById("feedback").value;

  // After form submission, display the success message
  document.getElementById("surveySuccessMessage").style.display = "block";

  // Optionally, clear the form after submission
  document.getElementById("surveyForm").reset();
});

