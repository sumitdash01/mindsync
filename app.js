// Application Data
const appData = {
  counsellors: [
    {
      id: 1,
      name: "Dr. Sumit Dash",
      specialization: "Anxiety & Depression",
      languages: ["English", "Hindi", "Odia"],
      availability: ["Monday 9:00-17:00", "Wednesday 9:00-17:00", "Friday 9:00-17:00"]
    },
    {
      id: 2,
      name: "Dr. Ashutosh Samantaray",
      specialization: "Stress Management", 
      languages: ["English", "Hindi", "Odia"],
      availability: ["Tuesday 10:00-18:00", "Thursday 10:00-18:00", "Saturday 10:00-14:00"]
    },
    {
      id: 3,
      name: "Dr. Ashutosh Maharana",
      specialization: "Academic Counseling",
      languages: ["English", "Hindi", "Odia"],
      availability: ["Monday 10:00-16:00", "Tuesday 10:00-16:00", "Friday 10:00-16:00"]
    }
  ],
  crisisContacts: {
    defaultNumbers: [
      "57301580",
      "57092510", 
      "1860 266 2345",
      "9152987821",
      "080-46110007"
    ],
    campusLocation: "Trident Academy Of Technology, Bhubaneswar"
  },
  resources: {
    categories: [
      {
        name: "Mental Health Videos",
        icon: "fas fa-video",
        items: [
          "Understanding Anxiety in Students",
          "Stress Management Techniques", 
          "Building Resilience",
          "Healthy Study Habits"
        ]
      },
      {
        name: "Relaxation Audio",
        icon: "fas fa-headphones",
        items: [
          "Progressive Muscle Relaxation",
          "Breathing Exercises",
          "Nature Sounds",
          "Guided Sleep Stories"
        ]
      },
      {
        name: "Meditation Content",
        icon: "fas fa-leaf",
        items: [
          "Mindfulness for Beginners",
          "Study Focus Meditation",
          "Exam Stress Relief",
          "Daily Mindfulness Practices",
          "Walking Meditation",
          "Body Scan Meditation"
        ]
      },
      {
        name: "Wellness Guides",
        icon: "fas fa-book",
        items: [
          "Self-Care Strategies",
          "Time Management",
          "Social Anxiety Help",
          "Sleep Hygiene"
        ]
      }
    ]
  },
  peerSupport: {
    forums: [
      {
        name: "General Support",
        description: "Open discussions about mental health and wellness",
        moderator: "Student Volunteer Team"
      },
      {
        name: "Academic Stress", 
        description: "Share experiences and coping strategies for academic pressure",
        moderator: "Dr. Ashutosh Maharana"
      },
      {
        name: "Social Anxiety",
        description: "Support for those dealing with social situations and relationships",
        moderator: "Student Volunteer Team"
      },
      {
        name: "Life Transitions",
        description: "Navigating major life changes and adjustments",
        moderator: "Dr. Sumit Dash"
      }
    ]
  },
  userProfile: {
    fields: [
      {name: "fullName", label: "Full Name", type: "text", required: true},
      {name: "age", label: "Age", type: "number", required: true},
      {name: "education", label: "Educational Qualification", type: "text", required: true},
      {name: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Non-binary", "Prefer not to say"], required: true},
      {name: "email", label: "Email", type: "email", required: true},
      {name: "collegeName", label: "College Name", type: "text", required: true},
      {name: "contactNumber", label: "Contact Number", type: "tel", required: true},
      {name: "secondaryContact", label: "Optional Second Number", type: "tel", required: false},
      {name: "sessionsAttended", label: "Sessions Attended", type: "number", readonly: true},
      {name: "joinDate", label: "Member Since", type: "date", readonly: true}
    ]
  }
};

// Application State
let currentChatMode = 'mental-health';
let isProfileEditing = false;
let userCrisisNumbers = [...appData.crisisContacts.defaultNumbers];
let userProfile = {
  fullName: "John Doe",
  age: 21,
  education: "B.Tech Computer Science",
  gender: "Male",
  email: "john.doe@student.edu",
  collegeName: "Trident Academy Of Technology",
  contactNumber: "+91 9876543210",
  secondaryContact: "",
  sessionsAttended: 3,
  joinDate: "2024-01-15"
};

// Chat Responses
const chatResponses = {
  'mental-health': {
    greeting: "Hello! I'm here to support you with your mental health concerns. How are you feeling today?",
    anxiety: "I understand you're feeling anxious. That's completely normal, especially for students. Here are some quick techniques that might help: Try the 4-7-8 breathing method - breathe in for 4, hold for 7, exhale for 8. You could also try the 5-4-3-2-1 grounding technique. Would you like me to guide you through either of these?",
    stress: "Academic stress can be overwhelming. Let's break this down together. Have you tried organizing your tasks into smaller, manageable chunks? Sometimes just writing everything down can help reduce that mental load. I can also connect you with one of our counsellors if you'd like professional support.",
    depression: "I hear that you're going through a difficult time. Your feelings are valid, and it's brave of you to reach out. While I can offer some immediate support, I'd strongly recommend speaking with one of our counsellors. They can provide the professional help you deserve. Would you like me to help you book an appointment?",
    crisis: "I'm very concerned about what you've shared with me. Your safety and wellbeing are the most important things right now. Please reach out to our crisis line immediately at 57301580 - they're available 24/7. Would you like me to help you connect with emergency support right now?",
    sleep: "Sleep issues are really common among students. Poor sleep can affect everything - your mood, concentration, and stress levels. Some tips that might help: try to keep a consistent sleep schedule, avoid screens an hour before bed, and create a relaxing bedtime routine. Our resources section has some great guided sleep meditations too!",
    exam: "Exam stress is something most students face. You're not alone in feeling this way. Some strategies that help: break your study material into smaller chunks, take regular breaks, practice some relaxation techniques, and remember that one exam doesn't define you. How are you currently preparing?",
    social: "Social situations can feel really challenging sometimes. It's okay to feel nervous or anxious around others - many students experience this. Some gentle approaches: start with small interactions, practice self-compassion, and remember that most people are focused on themselves, not judging you. Would you like some specific techniques for social confidence?"
  },
  'casual': {
    greeting: "Hey there! I'm your friendly AI companion. What's on your mind today? 😊",
    general: "That sounds interesting! I'd love to hear more about that. What's got you thinking about this topic?",
    study: "Ah, the student life! What subject are you diving into? I love chatting about different topics - maybe I can be your study buddy or help you think through some concepts!",
    weather: "Weather definitely affects how we feel! Are you someone who loves sunny days or do you prefer cozy rainy weather? I find it fascinating how different people respond to different weather patterns.",
    food: "Food is one of life's greatest pleasures! What kind of cuisine are you into? I always enjoy hearing about people's favorite dishes - there's something so personal and cultural about food preferences.",
    hobbies: "Hobbies are such a great way to unwind from academic stress! What do you like to do in your free time? Whether it's creative, sporty, or just relaxing - I'd love to hear about it!",
    technology: "Tech is everywhere these days, isn't it? Are you into gadgets, programming, gaming, or maybe just trying to keep up with all the changes? What's your relationship with technology like?",
    music: "Music is such a universal language! What genres do you enjoy? Do you have any favorite artists or songs that just hit different? I find it amazing how music can completely change our mood.",
    movies: "Movies and shows are perfect conversation starters! Seen anything good lately? I love hearing about what people are watching - from blockbusters to indie films to binge-worthy series."
  }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeChat();
  initializeCrisisSupport();
  initializeBooking();
  initializeResources(); 
  initializePeerSupport();
  initializeProfile();
  
  // Load stored crisis numbers
  const storedNumbers = localStorage.getItem('userCrisisNumbers');
  if (storedNumbers) {
    try {
      userCrisisNumbers = JSON.parse(storedNumbers);
    } catch (e) {
      userCrisisNumbers = [...appData.crisisContacts.defaultNumbers];
    }
  }
  
  // Load stored profile
  const storedProfile = localStorage.getItem('userProfile');
  if (storedProfile) {
    try {
      userProfile = {...userProfile, ...JSON.parse(storedProfile)};
    } catch (e) {
      // Keep default profile if parsing fails
    }
  }
  
  updateProfileDisplay();
});

// Navigation Functions
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSection = link.getAttribute('data-section');
      if (targetSection) {
        showSection(targetSection);
        
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });
  
  // Handle footer navigation links
  document.querySelectorAll('.footer-links a[data-section]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSection = link.getAttribute('data-section');
      if (targetSection) {
        showSection(targetSection);
        
        navLinks.forEach(l => l.classList.remove('active'));
        const navLink = document.querySelector(`.nav-link[data-section="${targetSection}"]`);
        if (navLink) {
          navLink.classList.add('active');
        }
      }
    });
  });
  
  // Handle quick access cards
  document.querySelectorAll('.quick-access-card').forEach(card => {
    card.addEventListener('click', () => {
      const targetSection = card.getAttribute('data-section');
      if (targetSection) {
        showSection(targetSection);
        
        navLinks.forEach(l => l.classList.remove('active'));
        const navLink = document.querySelector(`.nav-link[data-section="${targetSection}"]`);
        if (navLink) {
          navLink.classList.add('active');
        }
      }
    });
  });
}

function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.remove('active');
  });
  
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
  }
}

// Chat Functions
function initializeChat() {
  const chatModeButtons = document.querySelectorAll('[data-mode]');
  const sendButton = document.getElementById('sendMessage');
  const chatInput = document.getElementById('chatInput');
  
  if (chatModeButtons.length > 0) {
    chatModeButtons.forEach(button => {
      button.addEventListener('click', () => {
        chatModeButtons.forEach(b => b.classList.remove('active'));
        button.classList.add('active');
        currentChatMode = button.getAttribute('data-mode');
        
        // Clear chat and show appropriate greeting
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
          chatMessages.innerHTML = '';
          const greeting = currentChatMode === 'mental-health' 
            ? chatResponses['mental-health'].greeting
            : chatResponses.casual.greeting;
          
          addBotMessage(greeting);
        }
      });
    });
  }
  
  if (sendButton) {
    sendButton.addEventListener('click', sendMessage);
  }
  
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
}

function sendMessage() {
  const chatInput = document.getElementById('chatInput');
  if (!chatInput) return;
  
  const message = chatInput.value.trim();
  if (!message) return;
  
  addUserMessage(message);
  chatInput.value = '';
  
  setTimeout(() => {
    const response = generateResponse(message, currentChatMode);
    addBotMessage(response);
  }, 1000);
}

function addUserMessage(message) {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;
  
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message user-message';
  messageDiv.innerHTML = `<div class="message-content"><p>${message}</p></div>`;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addBotMessage(message) {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;
  
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message bot-message';
  messageDiv.innerHTML = `<div class="message-content"><p>${message}</p></div>`;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateResponse(userMessage, mode) {
  const lowerMessage = userMessage.toLowerCase();
  const responses = chatResponses[mode];
  
  // Crisis detection
  if (lowerMessage.includes('hurt myself') || lowerMessage.includes('suicide') || 
      lowerMessage.includes('end it all') || lowerMessage.includes('kill myself')) {
    return responses.crisis || "I'm very concerned about you. Please reach out for help immediately.";
  }
  
  // Mental health mode responses
  if (mode === 'mental-health') {
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried') || lowerMessage.includes('panic')) {
      return responses.anxiety;
    }
    if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('pressure')) {
      return responses.stress;
    }
    if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('hopeless') || lowerMessage.includes('down')) {
      return responses.depression;
    }
    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired')) {
      return responses.sleep;
    }
    if (lowerMessage.includes('exam') || lowerMessage.includes('test') || lowerMessage.includes('study')) {
      return responses.exam;
    }
    if (lowerMessage.includes('social') || lowerMessage.includes('friends') || lowerMessage.includes('awkward')) {
      return responses.social;
    }
  }
  
  // Casual mode responses
  if (mode === 'casual') {
    if (lowerMessage.includes('study') || lowerMessage.includes('homework') || lowerMessage.includes('assignment')) {
      return responses.study;
    }
    if (lowerMessage.includes('weather') || lowerMessage.includes('rain') || lowerMessage.includes('sunny')) {
      return responses.weather;
    }
    if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('hungry')) {
      return responses.food;
    }
    if (lowerMessage.includes('hobby') || lowerMessage.includes('free time') || lowerMessage.includes('relax')) {
      return responses.hobbies;
    }
    if (lowerMessage.includes('technology') || lowerMessage.includes('computer') || lowerMessage.includes('coding')) {
      return responses.technology;
    }
    if (lowerMessage.includes('music') || lowerMessage.includes('song') || lowerMessage.includes('band')) {
      return responses.music;
    }
    if (lowerMessage.includes('movie') || lowerMessage.includes('film') || lowerMessage.includes('show')) {
      return responses.movies;
    }
    return responses.general;
  }
  
  // Default response
  return mode === 'mental-health' 
    ? "I understand you're reaching out. Can you tell me more about how you're feeling right now? I'm here to listen and support you."
    : "That's interesting! Tell me more about what's on your mind. I'm enjoying our conversation! 😊";
}

// Crisis Support Functions
function initializeCrisisSupport() {
  const crisisBtn = document.getElementById('crisisBtn');
  const crisisModal = document.getElementById('crisisModal');
  
  if (crisisBtn && crisisModal) {
    crisisBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      crisisModal.classList.remove('hidden');
      populateCrisisNumbers();
    });
    
    const closeCrisisModal = document.getElementById('closeCrisisModal');
    if (closeCrisisModal) {
      closeCrisisModal.addEventListener('click', () => {
        crisisModal.classList.add('hidden');
      });
    }
    
    const crisisOverlay = document.getElementById('crisisOverlay');
    if (crisisOverlay) {
      crisisOverlay.addEventListener('click', () => {
        crisisModal.classList.add('hidden');
      });
    }
  }
  
  const editCrisisNumbers = document.getElementById('editCrisisNumbers');
  const editCrisisModal = document.getElementById('editCrisisModal');
  
  if (editCrisisNumbers && editCrisisModal) {
    editCrisisNumbers.addEventListener('click', () => {
      editCrisisModal.classList.remove('hidden');
      populateCrisisNumberInputs();
    });
    
    const closeEditCrisisModal = document.getElementById('closeEditCrisisModal');
    if (closeEditCrisisModal) {
      closeEditCrisisModal.addEventListener('click', () => {
        editCrisisModal.classList.add('hidden');
      });
    }
    
    const editCrisisOverlay = document.getElementById('editCrisisOverlay');
    if (editCrisisOverlay) {
      editCrisisOverlay.addEventListener('click', () => {
        editCrisisModal.classList.add('hidden');
      });
    }
    
    const cancelEditCrisis = document.getElementById('cancelEditCrisis');
    if (cancelEditCrisis) {
      cancelEditCrisis.addEventListener('click', () => {
        editCrisisModal.classList.add('hidden');
      });
    }
    
    const editCrisisForm = document.getElementById('editCrisisForm');
    if (editCrisisForm) {
      editCrisisForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveCrisisNumbers();
      });
    }
  }
}

function populateCrisisNumbers() {
  const container = document.getElementById('crisisNumbers');
  if (!container) return;
  
  container.innerHTML = userCrisisNumbers.map(number => `
    <div class="crisis-number">
      <i class="fas fa-phone"></i>
      <a href="tel:${number}">${number}</a>
    </div>
  `).join('');
}

function populateCrisisNumberInputs() {
  const container = document.getElementById('crisisNumberInputs');
  if (!container) return;
  
  container.innerHTML = userCrisisNumbers.map((number, index) => `
    <div class="form-group">
      <label class="form-label">Crisis Number ${index + 1}</label>
      <input type="tel" class="form-control crisis-number-input" value="${number}" data-index="${index}">
    </div>
  `).join('');
}

function saveCrisisNumbers() {
  const inputs = document.querySelectorAll('.crisis-number-input');
  userCrisisNumbers = Array.from(inputs).map(input => input.value.trim()).filter(num => num);
  
  localStorage.setItem('userCrisisNumbers', JSON.stringify(userCrisisNumbers));
  populateCrisisNumbers();
  
  const editCrisisModal = document.getElementById('editCrisisModal');
  if (editCrisisModal) {
    editCrisisModal.classList.add('hidden');
  }
}

// Booking Functions
function initializeBooking() {
  populateCounsellors();
  
  const selectedCounsellor = document.getElementById('selectedCounsellor');
  if (selectedCounsellor) {
    selectedCounsellor.addEventListener('change', (e) => {
      const counsellorId = parseInt(e.target.value);
      const counsellor = appData.counsellors.find(c => c.id === counsellorId);
      populateAvailableSlots(counsellor);
    });
  }
  
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleBookingSubmit();
    });
  }
}

function populateCounsellors() {
  const container = document.getElementById('counsellorCards');
  const select = document.getElementById('selectedCounsellor');
  
  if (container) {
    container.innerHTML = appData.counsellors.map(counsellor => `
      <div class="counsellor-card">
        <div class="counsellor-name">${counsellor.name}</div>
        <div class="counsellor-specialization">${counsellor.specialization}</div>
        <div class="counsellor-languages">Languages: ${counsellor.languages.join(', ')}</div>
        <div class="counsellor-availability">
          <strong>Available:</strong><br>
          ${counsellor.availability.join('<br>')}
        </div>
      </div>
    `).join('');
  }
  
  if (select) {
    select.innerHTML = '<option value="">Choose a counsellor</option>' + 
      appData.counsellors.map(counsellor => 
        `<option value="${counsellor.id}">${counsellor.name}</option>`
      ).join('');
  }
}

function populateAvailableSlots(counsellor) {
  const timeSelect = document.getElementById('appointmentTime');
  if (!timeSelect) return;
  
  if (!counsellor) {
    timeSelect.innerHTML = '<option value="">Select time</option>';
    return;
  }
  
  // Generate time slots based on availability
  const slots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];
  
  timeSelect.innerHTML = '<option value="">Select time</option>' +
    slots.map(time => `<option value="${time}">${time}</option>`).join('');
}

function handleBookingSubmit() {
  alert('Appointment booked successfully! You will receive a confirmation email shortly.');
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.reset();
  }
}

// Resources Functions
function initializeResources() {
  const container = document.getElementById('resourcesCategories');
  if (!container) return;
  
  container.innerHTML = appData.resources.categories.map(category => `
    <div class="resource-category">
      <h3><i class="${category.icon}"></i> ${category.name}</h3>
      <ul class="resource-items">
        ${category.items.map(item => `
          <li><i class="fas fa-play-circle"></i> ${item}</li>
        `).join('')}
      </ul>
    </div>
  `).join('');
}

// Peer Support Functions
function initializePeerSupport() {
  const container = document.getElementById('peerForums');
  if (!container) return;
  
  container.innerHTML = appData.peerSupport.forums.map(forum => `
    <div class="forum-card">
      <h3 class="forum-name">${forum.name}</h3>
      <p class="forum-description">${forum.description}</p>
      <p class="forum-moderator"><strong>Moderator:</strong> ${forum.moderator}</p>
      <button class="btn btn--primary btn--sm">Join Discussion</button>
    </div>
  `).join('');
}

// Profile Functions
function initializeProfile() {
  const editProfileBtn = document.getElementById('editProfileBtn');
  if (editProfileBtn) {
    editProfileBtn.addEventListener('click', toggleProfileEdit);
  }
  
  generateProfileForm();
  updateProfileDisplay();
}

function generateProfileForm() {
  const container = document.querySelector('.profile-form-container');
  if (!container) return;
  
  const formHTML = `
    <form id="profileForm">
      <div class="profile-form-grid">
        ${appData.userProfile.fields.map(field => {
          let inputHTML = '';
          
          if (field.type === 'select') {
            inputHTML = `
              <select class="form-control" id="${field.name}" ${field.required ? 'required' : ''} ${field.readonly ? 'disabled' : ''}>
                <option value="">Select ${field.label}</option>
                ${field.options.map(option => 
                  `<option value="${option}" ${userProfile[field.name] === option ? 'selected' : ''}>${option}</option>`
                ).join('')}
              </select>
            `;
          } else {
            inputHTML = `
              <input 
                type="${field.type}" 
                class="form-control ${field.readonly ? 'field-readonly' : ''}" 
                id="${field.name}"
                value="${userProfile[field.name] || ''}"
                ${field.required ? 'required' : ''}
                ${field.readonly ? 'readonly' : ''}
              >
            `;
          }
          
          return `
            <div class="form-group">
              <label class="form-label" for="${field.name}">${field.label}</label>
              ${inputHTML}
            </div>
          `;
        }).join('')}
      </div>
      <div class="form-actions" id="profileFormActions" style="display: none;">
        <button type="submit" class="btn btn--primary">Save Changes</button>
        <button type="button" class="btn btn--secondary" id="cancelProfileEdit">Cancel</button>
      </div>
    </form>
  `;
  
  container.innerHTML = formHTML;
  
  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', saveProfile);
  }
  
  const cancelProfileEdit = document.getElementById('cancelProfileEdit');
  if (cancelProfileEdit) {
    cancelProfileEdit.addEventListener('click', () => {
      toggleProfileEdit();
      generateProfileForm(); // Reset form
    });
  }
}

function toggleProfileEdit() {
  isProfileEditing = !isProfileEditing;
  const formInputs = document.querySelectorAll('#profileForm input:not(.field-readonly), #profileForm select');
  const formActions = document.getElementById('profileFormActions');
  const editBtn = document.getElementById('editProfileBtn');
  
  if (formInputs.length > 0) {
    formInputs.forEach(input => {
      input.disabled = !isProfileEditing;
    });
  }
  
  if (formActions) {
    formActions.style.display = isProfileEditing ? 'flex' : 'none';
  }
  
  if (editBtn) {
    editBtn.textContent = isProfileEditing ? 'Cancel Edit' : 'Edit Profile';
    editBtn.style.display = isProfileEditing ? 'none' : 'block';
  }
}

function saveProfile(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const updatedProfile = Object.fromEntries(formData);
  
  // Merge with existing profile data
  userProfile = {...userProfile, ...updatedProfile};
  
  // Save to localStorage (simulate backend integration)
  localStorage.setItem('userProfile', JSON.stringify(userProfile));
  
  updateProfileDisplay();
  toggleProfileEdit();
  generateProfileForm();
  
  alert('Profile updated successfully!');
}

function updateProfileDisplay() {
  const profileName = document.getElementById('profileName');
  const profileEmail = document.getElementById('profileEmail');
  
  if (profileName) {
    profileName.textContent = userProfile.fullName || 'Student Name';
  }
  
  if (profileEmail) {
    profileEmail.textContent = userProfile.email || 'student@example.com';
  }
}