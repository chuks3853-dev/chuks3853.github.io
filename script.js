// Selects the mobile menu button from the HTML document.
const menuToggle = document.querySelector("#menuToggle"); // Stores the menu button for later event handling.
// Selects the navigation list that will open and close on small screens.
const navLinks = document.querySelector("#navLinks"); // Stores the navigation container.
// Adds a click event so the mobile menu can be opened and closed.
menuToggle.addEventListener("click", () => { // Runs this function whenever the menu button is clicked.
  navLinks.classList.toggle("open"); // Adds or removes the CSS class that displays the mobile menu.
}); // Ends the mobile menu click event.
// Selects every navigation link so the menu can close after a selection.
document.querySelectorAll(".nav-link").forEach((link) => { // Loops through every navigation link.
  link.addEventListener("click", () => { // Runs when the user selects a navigation link.
    navLinks.classList.remove("open"); // Closes the mobile menu after navigation.
  }); // Ends the navigation-link click event.
}); // Ends the navigation-link loop.
// Selects the theme button for dark-mode functionality.
const themeToggle = document.querySelector("#themeToggle"); // Stores the theme button.
// Reads the user's saved theme preference from localStorage.
const savedTheme = localStorage.getItem("grandHavenTheme"); // Retrieves previously saved theme data.
// Applies dark mode if the user selected it during a previous visit.
if (savedTheme === "dark") { // Checks whether the saved theme is dark.
  document.body.classList.add("dark"); // Adds the dark theme class to the body.
} // Ends the saved-theme condition.
// Adds a click event to the theme button.
themeToggle.addEventListener("click", () => { // Runs whenever the theme button is clicked.
  document.body.classList.toggle("dark"); // Switches between light and dark themes.
  const currentTheme = document.body.classList.contains("dark") ? "dark" : "light"; // Determines the current theme using a ternary operator.
  localStorage.setItem("grandHavenTheme", currentTheme); // Saves the selected theme in the browser.
  showToast(currentTheme === "dark" ? "Dark mode enabled" : "Light mode enabled"); // Gives the user immediate visual feedback.
}); // Ends the theme toggle event.
// Selects all hero slides and prepares the slideshow.
const heroSlides = [...document.querySelectorAll(".hero-slide")]; // Converts the slide NodeList into a normal array.
const heroDots = document.querySelector("#heroDots"); // Selects the container for dynamically created dots.
let currentSlide = 0; // Stores the index of the currently visible hero slide.
// Creates one navigation dot for every hero slide.
heroSlides.forEach((_, index) => { // Loops through each hero slide.
  const dot = document.createElement("button"); // Creates a new button element.
  dot.className = "hero-dot"; // Gives the button the CSS class used for dots.
  dot.setAttribute("aria-label", `Show slide ${index + 1}`); // Adds an accessible description using a template literal.
  dot.addEventListener("click", () => { // Allows users to select a specific slide.
    showSlide(index); // Changes the slideshow to the selected slide.
  }); // Ends the dot click event.
  heroDots.appendChild(dot); // Adds the newly created dot to the page.
}); // Ends the hero dot creation loop.
// Defines the function that displays a specific hero slide.
function showSlide(index) { // Creates a reusable slideshow function.
  currentSlide = index; // Updates the global slide index.
  heroSlides.forEach((slide, slideIndex) => { // Loops through all slides.
    slide.classList.toggle("active", slideIndex === currentSlide); // Activates only the selected slide.
  }); // Ends the slide loop.
  [...heroDots.children].forEach((dot, dotIndex) => { // Loops through every generated dot.
    dot.classList.toggle("active", dotIndex === currentSlide); // Highlights only the active dot.
  }); // Ends the dot loop.
} // Ends the showSlide function.
// Displays the first slide when the page loads.
showSlide(0); // Initializes the slideshow.
// Automatically changes the hero slide every five seconds.
setInterval(() => { // Creates a repeating timer.
  showSlide((currentSlide + 1) % heroSlides.length); // Uses modulo to loop back to the first slide.
}, 5000); // Sets the slideshow interval to five seconds.
// Selects all room filter buttons.
const filterButtons = document.querySelectorAll(".filter-btn"); // Stores all filter controls.
// Selects all room cards.
const roomCards = document.querySelectorAll(".room-card"); // Stores every room card.
// Adds filtering behavior to each room filter.
filterButtons.forEach((button) => { // Loops through all filter buttons.
  button.addEventListener("click", () => { // Runs when a filter is clicked.
    filterButtons.forEach((item) => item.classList.remove("active")); // Removes the active style from every filter.
    button.classList.add("active"); // Marks the clicked filter as active.
    const selectedFilter = button.dataset.filter; // Reads the filter value from the data-filter attribute.
    roomCards.forEach((card) => { // Loops through every room card.
      const matches = selectedFilter === "all" || card.dataset.category === selectedFilter; // Determines whether the room matches the selected category.
      card.style.display = matches ? "" : "none"; // Shows matching rooms and hides non-matching rooms.
    }); // Ends the room filtering loop.
  }); // Ends the filter click event.
}); // Ends the filter button loop.
// Creates an object containing detailed information for each room.
const roomData = { // Starts the room data object.
  "Deluxe King": { description: "A calm, spacious retreat with a king bed, city views and carefully selected comforts.", features: ["42 m²", "King bed", "Rain shower", "City view"] }, // Stores Deluxe King information.
  "Haven Suite": { description: "Our signature suite combines a generous bedroom, private lounge and elevated city views.", features: ["68 m²", "King bed", "Separate lounge", "Premium minibar"] }, // Stores Haven Suite information.
  "Family Residence": { description: "A flexible two-bedroom residence designed for longer family stays and effortless togetherness.", features: ["96 m²", "2 bedrooms", "Kitchenette", "Dining area"] } // Stores Family Residence information.
}; // Ends the room data object.
// Selects all room details buttons.
const detailButtons = document.querySelectorAll(".room-details"); // Stores every room-details button.
// Selects modal elements used to display room information.
const roomModal = document.querySelector("#roomModal"); // Stores the room modal.
const modalTitle = document.querySelector("#modalTitle"); // Stores the modal title element.
const modalText = document.querySelector("#modalText"); // Stores the modal description element.
const modalFeatures = document.querySelector("#modalFeatures"); // Stores the modal feature list.
// Opens the room modal when a details button is clicked.
detailButtons.forEach((button) => { // Loops through room detail buttons.
  button.addEventListener("click", () => { // Runs when a room detail button is clicked.
    const roomName = button.dataset.room; // Reads the room name from the data-room attribute.
    const room = roomData[roomName]; // Retrieves the matching room object.
    modalTitle.textContent = roomName; // Inserts the selected room name into the modal.
    modalText.textContent = room.description; // Inserts the selected room description into the modal.
    modalFeatures.innerHTML = room.features.map((feature) => `<li>${feature}</li>`).join(""); // Converts the feature array into HTML list items using map and join.
    roomModal.classList.add("show"); // Displays the modal.
    roomModal.setAttribute("aria-hidden", "false"); // Updates accessibility state.
  }); // Ends the detail button event.
}); // Ends the detail button loop.
// Creates a reusable function for closing the room modal.
function closeRoomModal() { // Defines the room modal close function.
  roomModal.classList.remove("show"); // Hides the modal.
  roomModal.setAttribute("aria-hidden", "true"); // Restores the hidden accessibility state.
} // Ends the room modal close function.
// Connects the close button to the modal close function.
document.querySelector("#modalClose").addEventListener("click", closeRoomModal); // Closes the modal when the close button is clicked.
// Closes the modal if the dark overlay itself is clicked.
roomModal.addEventListener("click", (event) => { // Listens for clicks anywhere on the modal overlay.
  if (event.target === roomModal) closeRoomModal(); // Closes only when the overlay, not the modal box, is clicked.
}); // Ends the modal overlay event.
// Selects all gallery buttons.
const galleryItems = document.querySelectorAll(".gallery-item"); // Stores all gallery image buttons.
// Selects the lightbox and its image.
const lightbox = document.querySelector("#lightbox"); // Stores the lightbox overlay.
const lightboxImage = document.querySelector("#lightboxImage"); // Stores the expanded image.
// Opens the lightbox when a gallery image is clicked.
galleryItems.forEach((item) => { // Loops through gallery items.
  item.addEventListener("click", () => { // Runs when a gallery item is clicked.
    lightboxImage.src = item.dataset.full; // Sets the large image source from the data-full attribute.
    lightboxImage.alt = item.querySelector("img").alt; // Copies the thumbnail's accessible alt text.
    lightbox.classList.add("show"); // Displays the lightbox.
    lightbox.setAttribute("aria-hidden", "false"); // Updates lightbox accessibility state.
  }); // Ends the gallery click event.
}); // Ends the gallery item loop.
// Creates a reusable function for closing the lightbox.
function closeLightbox() { // Defines the lightbox close function.
  lightbox.classList.remove("show"); // Hides the lightbox.
  lightbox.setAttribute("aria-hidden", "true"); // Restores the hidden accessibility state.
} // Ends the lightbox close function.
// Connects the lightbox close button to the close function.
document.querySelector("#lightboxClose").addEventListener("click", closeLightbox); // Closes the lightbox when its close button is clicked.
// Allows clicking the dark overlay to close the lightbox.
lightbox.addEventListener("click", (event) => { // Listens for clicks on the lightbox overlay.
  if (event.target === lightbox) closeLightbox(); // Closes the lightbox when the background is clicked.
}); // Ends the lightbox overlay event.
// Selects all FAQ questions.
document.querySelectorAll(".faq-question").forEach((question) => { // Loops through every FAQ question.
  question.addEventListener("click", () => { // Runs when an FAQ question is clicked.
    const item = question.parentElement; // Gets the parent FAQ item.
    document.querySelectorAll(".faq-item").forEach((faq) => { // Loops through every FAQ item.
      if (faq !== item) faq.classList.remove("open"); // Closes other open answers to create a single-open accordion.
    }); // Ends the FAQ close loop.
    item.classList.toggle("open"); // Opens or closes the clicked FAQ item.
  }); // Ends the FAQ question event.
}); // Ends the FAQ question loop.
// Selects the booking form and its inputs.
const bookingForm = document.querySelector("#bookingForm"); // Stores the booking form.
const checkIn = document.querySelector("#checkIn"); // Stores the check-in input.
const checkOut = document.querySelector("#checkOut"); // Stores the check-out input.
const bookingMessage = document.querySelector("#bookingMessage"); // Stores the booking feedback paragraph.
// Creates today's date in the format required by an HTML date input.
const today = new Date().toISOString().split("T")[0]; // Converts the current date to YYYY-MM-DD.
// Prevents users from choosing a past check-in date.
checkIn.min = today; // Sets today's date as the earliest possible check-in.
// Validates the check-out date whenever the check-in date changes.
checkIn.addEventListener("change", () => { // Runs when the check-in date changes.
  checkOut.min = checkIn.value || today; // Prevents check-out from being before check-in.
  if (checkOut.value && checkOut.value < checkIn.value) checkOut.value = ""; // Clears an invalid existing check-out value.
}); // Ends the check-in change event.
// Handles the booking form submission.
bookingForm.addEventListener("submit", (event) => { // Runs when the form is submitted.
  event.preventDefault(); // Prevents the browser from reloading the page.
  const start = new Date(checkIn.value); // Converts the check-in date into a Date object.
  const end = new Date(checkOut.value); // Converts the check-out date into a Date object.
  if (end <= start) { // Checks whether the checkout date is invalid.
    bookingMessage.textContent = "Please choose a check-out date after your check-in date."; // Displays a validation error.
    bookingMessage.style.color = "#c45b4a"; // Temporarily changes the feedback color to an error tone.
    return; // Stops the function before processing an invalid booking.
  } // Ends the invalid-date condition.
  const nights = Math.ceil((end - start) / 86400000); // Calculates the number of nights using milliseconds.
  const guests = document.querySelector("#guests").value; // Reads the selected number of guests.
  const room = document.querySelector("#roomType").value; // Reads the selected room type.
  bookingMessage.style.color = "var(--gold)"; // Restores the normal feedback color.
  bookingMessage.textContent = `Great! We found availability for ${guests} guest(s), ${nights} night(s), room: ${room}.`; // Displays a dynamic availability result.
  showToast("Availability checked successfully."); // Displays a temporary toast confirmation.
}); // Ends the booking form event.
// Selects all counters used for the animated statistics.
const counters = document.querySelectorAll(".counter"); // Stores all counter elements.
// Creates a function that animates a counter from zero to its target.
function animateCounter(counter) { // Defines the counter animation function.
  const target = Number(counter.dataset.target); // Converts the target data attribute into a number.
  let value = 0; // Starts the counter at zero.
  const step = Math.max(1, Math.ceil(target / 60)); // Calculates a sensible increment for the animation.
  const timer = setInterval(() => { // Creates a short repeating timer.
    value += step; // Increases the displayed value.
    counter.textContent = value >= target ? target : value; // Prevents the counter from exceeding the target.
    if (value >= target) clearInterval(timer); // Stops the timer when the target is reached.
  }, 25); // Runs the counter update every 25 milliseconds.
} // Ends the counter animation function.
// Creates an IntersectionObserver to trigger counters only when visible.
const statsObserver = new IntersectionObserver((entries, observer) => { // Creates a viewport observer for the statistics section.
  entries.forEach((entry) => { // Loops through observed entries.
    if (entry.isIntersecting) { // Checks whether the counter area is visible.
      counters.forEach(animateCounter); // Starts every counter animation.
      observer.disconnect(); // Stops observing after the first animation.
    } // Ends the visibility condition.
  }); // Ends the observer entry loop.
}); // Ends the statistics observer.
// Starts observing the first counter.
statsObserver.observe(counters[0]); // Watches for the statistics section entering the viewport.
// Selects all elements that should animate into view.
const revealElements = document.querySelectorAll(".reveal"); // Stores every reveal element.
// Creates an observer for scroll-reveal animations.
const revealObserver = new IntersectionObserver((entries) => { // Creates a viewport observer for reveal effects.
  entries.forEach((entry) => { // Loops through observed elements.
    if (entry.isIntersecting) { // Checks whether an element is visible.
      entry.target.classList.add("visible"); // Adds the CSS class that performs the reveal animation.
    } // Ends the visibility condition.
  }); // Ends the reveal entry loop.
}, { threshold: 0.12 }); // Triggers the animation when about 12 percent of an element is visible.
// Starts observing every reveal element.
revealElements.forEach((element) => revealObserver.observe(element)); // Connects each reveal element to the observer.
// Defines the testimonial data as an array of objects.
const reviews = [ // Starts the testimonial array.
  { quote: "The room felt like a private sanctuary, and the service was exceptional from arrival to checkout.", name: "Amaka O.", role: "Weekend guest" }, // Stores the first testimonial.
  { quote: "Beautiful design, excellent food and a concierge team that genuinely cared about every detail.", name: "David K.", role: "Business traveller" }, // Stores the second testimonial.
  { quote: "Grand Haven made our anniversary feel incredibly special. We are already planning our next stay.", name: "Tolu A.", role: "Celebration guest" } // Stores the third testimonial.
]; // Ends the testimonial array.
// Stores the current testimonial index.
let reviewIndex = 0; // Starts the slider at the first review.
// Selects the testimonial display container.
const testimonial = document.querySelector("#testimonial"); // Stores the testimonial element.
// Renders the selected testimonial into the page.
function renderReview() { // Defines the testimonial rendering function.
  const review = reviews[reviewIndex]; // Retrieves the current review object.
  testimonial.innerHTML = `<blockquote>“${review.quote}”</blockquote><cite>${review.name} · ${review.role}</cite>`; // Builds the testimonial HTML from object data.
} // Ends the review rendering function.
// Displays the first testimonial immediately.
renderReview(); // Initializes the testimonial slider.
// Connects the previous button to testimonial navigation.
document.querySelector("#prevReview").addEventListener("click", () => { // Runs when the previous button is clicked.
  reviewIndex = (reviewIndex - 1 + reviews.length) % reviews.length; // Moves backward while wrapping to the last review.
  renderReview(); // Updates the visible testimonial.
}); // Ends the previous review event.
// Connects the next button to testimonial navigation.
document.querySelector("#nextReview").addEventListener("click", () => { // Runs when the next button is clicked.
  reviewIndex = (reviewIndex + 1) % reviews.length; // Moves forward while wrapping to the first review.
  renderReview(); // Updates the visible testimonial.
}); // Ends the next review event.
// Automatically changes the testimonial every six seconds.
setInterval(() => { // Creates a repeating testimonial timer.
  reviewIndex = (reviewIndex + 1) % reviews.length; // Moves to the next review using modulo.
  renderReview(); // Displays the next review.
}, 6000); // Sets the testimonial interval to six seconds.
// Selects the back-to-top button.
const backTop = document.querySelector("#backTop"); // Stores the back-to-top button.
// Shows or hides the back-to-top button during scrolling.
window.addEventListener("scroll", () => { // Runs whenever the page is scrolled.
  backTop.classList.toggle("show", window.scrollY > 500); // Shows the button after the user scrolls more than 500 pixels.
}); // Ends the scroll event.
// Scrolls smoothly to the top when the back-to-top button is clicked.
backTop.addEventListener("click", () => { // Runs when the back-to-top button is clicked.
  window.scrollTo({ top: 0, behavior: "smooth" }); // Uses the browser scrolling API to return to the top.
}); // Ends the back-to-top event.
// Selects the footer year placeholder.
document.querySelector("#year").textContent = new Date().getFullYear(); // Inserts the current year automatically.
// Selects all sections that have IDs for scroll-based active navigation.
const sections = [...document.querySelectorAll("main section[id]")]; // Creates an array of identifiable page sections.
// Creates an observer to update the active navigation link.
const navObserver = new IntersectionObserver((entries) => { // Creates an observer for navigation tracking.
  entries.forEach((entry) => { // Loops through visible sections.
    if (!entry.isIntersecting) return; // Ignores sections that are not currently visible.
    document.querySelectorAll(".nav-link").forEach((link) => { // Loops through navigation links.
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`); // Activates the link whose href matches the visible section ID.
    }); // Ends the navigation link loop.
  }); // Ends the section entry loop.
}, { rootMargin: "-35% 0px -55% 0px" }); // Defines a central viewport zone for active navigation.
// Starts observing every identifiable section.
sections.forEach((section) => navObserver.observe(section)); // Connects each section to the navigation observer.
// Creates a reusable toast notification function.
let toastTimer; // Stores the timeout ID so repeated messages can reset the timer.
function showToast(message) { // Defines the toast function.
  const toast = document.querySelector("#toast"); // Selects the toast element.
  toast.textContent = message; // Inserts the provided message.
  toast.classList.add("show"); // Makes the toast visible.
  clearTimeout(toastTimer); // Cancels any previous toast timer.
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2500); // Hides the toast after 2.5 seconds.
} // Ends the toast function.
// Allows keyboard users to close overlays with the Escape key.
document.addEventListener("keydown", (event) => { // Listens for keyboard events across the document.
  if (event.key === "Escape") { // Checks whether the Escape key was pressed.
    closeRoomModal(); // Attempts to close the room modal.
    closeLightbox(); // Attempts to close the lightbox.
  } // Ends the Escape-key condition.
}); // Ends the keyboard event listener.