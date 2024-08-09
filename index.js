// Select the theme toggle button
let themeButton = document.getElementById("theme-button");

// Define the toggleDarkMode function
const toggleDarkMode = () => {
  // Toggle the "dark-mode" class on the body
  document.body.classList.toggle("dark-mode");
};

// Add a click event listener to the theme toggle button
themeButton.addEventListener("click", toggleDarkMode);

// Global variables for the modal animation
let scaleFactor = 1;
let modalImage = document.querySelector('.modal img'); // Adjust the selector as needed

// Function to scale the image for the modal
function scaleImage() {
  scaleFactor = scaleFactor === 1 ? 0.8 : 1;
  modalImage.style.transform = `scale(${scaleFactor})`;
}

// Variable to store the interval ID for the modal animation
let intervalId;

// Function to toggle the modal
const toggleModal = (person) => {
  const modal = document.getElementById('thanks-modal');
  const modalContent = document.getElementById('thanks-modal-content');

  modal.style.display = "flex";
  modalContent.textContent = `Thank you so much ${person.name}! ${person.hometown} represent!`;

  // Start the animation
  intervalId = setInterval(scaleImage, 500);

  // Hide the modal after a set time and stop the animation
  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId); // Stop the animation
  }, 4000); // 4 seconds
};

const signNowButton = document.getElementById('sign-now-button');

// Initialize the signature count
let count = 3;

// Function to update the signature count
const updateSignatureCount = () => {
  let counterElement = document.getElementById('counter');
  if (!counterElement) {
    counterElement = document.createElement('p');
    counterElement.setAttribute('id', 'counter');
    document.querySelector('.signatures').appendChild(counterElement);
  }
  counterElement.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;
};

// The function that will add a signature to the signatures div
const addSignature = (person) => {
  // Increment the count of signatures
  count += 1;

  // Create a new paragraph element for the signature
  const newSignature = document.createElement('p');
  newSignature.innerHTML = `🖊️ ${person.name} from ${person.hometown} (${person.email}) supports this cause.`;

  const signaturesContainer = document.querySelector('.signatures');
  signaturesContainer.appendChild(newSignature);

  // Update the signature count on the page
  updateSignatureCount();
};

// Define the validateForm function
const validateForm = (event) => {
  event.preventDefault();

  let containsErrors = false;
  const petitionInputs = document.getElementById("sign-petition").elements;

  let person = {
    name: petitionInputs[0].value.trim(),
    hometown: petitionInputs[1].value.trim(),
    email: petitionInputs[2].value.trim()
  };

  if (!person.email.includes('.com')) {
    petitionInputs[2].classList.add('error');
    containsErrors = true;
  }

  if (person.name.length < 2 || person.hometown.length < 2) {
    petitionInputs[0].classList.toggle('error', person.name.length < 2);
    petitionInputs[1].classList.toggle('error', person.hometown.length < 2);
    containsErrors = true;
  }

  // Call addSignature() and toggleModal() if no errors
  if (!containsErrors) {
    addSignature(person);
    toggleModal(person); // Call to display the modal

    // Clear input fields
    for (let input of petitionInputs) {
      if (input.type !== "button") {
        input.value = "";
      }
    }
  }
};

// Add a click event listener to the sign now button for validateForm
signNowButton.addEventListener('click', validateForm);

// Initial call to display the default signature count
updateSignatureCount();

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

let revealableContainers = document.querySelectorAll('.revealable');
function reveal() {
  for (let i = 0; i < revealableContainers.length; i++) {
      let windowHeight = window.innerHeight;
      let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
      if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
          revealableContainers[i].classList.add('active');
      } else {
          revealableContainers[i].classList.remove('active');
      }
  }
}
window.addEventListener('scroll', reveal);

// Select the close modal button
let closeModalButton = document.getElementById('close-modal-button');

// Function to hide the modal
const closeModal = () => {
  const modal = document.getElementById('thanks-modal');
  modal.style.display = "none";
  clearInterval(intervalId); // Stop the animation if it's running
};

// Add click event listener to the close modal button
closeModalButton.addEventListener('click', closeModal);