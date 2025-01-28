import { subjectDetail } from './detail.js';

const subjectItems = document.getElementById("subject-items");
const categories = [...new Set(subjectDetail.map((sub) => sub.category))]; // Extract unique categories

// Create a list of categories
categories.forEach((category) => {
  const listItem = document.createElement("li");
  listItem.innerHTML = `<a href="#" data-name="${category}">${category}</a>`;
  subjectItems.appendChild(listItem);
});

// Add event listeners to category links
document.querySelectorAll("#subject-items a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const category = this.dataset.name; // Use dataset.name since it's defined as data-name
    displaySubjectDetail(category);
  });
});

function displaySubjectDetail(category) {
  const subjectInfoSection = document.getElementById("subject-info");
  const subjectTitle = document.getElementById("subject-title");
  const subjectDetails = document.getElementById("subject-details");
  const totalLectureHours = document.getElementById("total-lecture-hours");

  // Filter subjects by category
  const subjectEntries = subjectDetail.filter((sub) => sub.category === category);

  // Update the title and details table
  subjectTitle.textContent = `${category} Category Details`;
  subjectDetails.innerHTML = subjectEntries
    .map((entry) => {
      return `<tr><td>${entry.category}</td><td>${entry.lectureHours}</td><td>${entry.name}</td></tr>`;
    })
    .join("");

  // Calculate total lecture hours
  const totalHours = subjectEntries.reduce((sum, entry) => sum + entry.lectureHours, 0);
  totalLectureHours.textContent = `Total Lecture Hours: ${totalHours}`;

  // Show the details section and hide the category list
  document.querySelector("#subject-items").style.display = "none";
  subjectInfoSection.style.display = "block";
}

// Handle the back button click
document.getElementById("back-to-list").addEventListener("click", () => {
  document.getElementById("subject-info").style.display = "none";
  document.querySelector("#subject-items").style.display = "block";
});
