// ============================================
// Valentine Week App - JavaScript
// ============================================

// Valentine Week Data
const valentineWeek = [
    {
        date: new Date(2026, 1, 7), // Feb 7
        name: "Rose Day",
        emoji: "🌹",
        message: "A rose speaks of love silently, in a language known only to the heart.",
        quote: '"A single rose can be my garden... a single friend, my world." - Leo Buscaglia',
        customMessage: "Dear {name}, like a rose, your beauty and warmth brighten every moment of my life. You are the most beautiful flower in my garden of love. 🌹"
    },
    {
        date: new Date(2026, 1, 8), // Feb 8
        name: "Propose Day",
        emoji: "💍",
        message: "Today is the day to express what your heart has been holding. Let your love be known!",
        quote: '"I love you not only for what you are, but for what I am when I am with you." - Elizabeth Barrett Browning',
        customMessage: "Dear {name}, every moment with you feels like a beautiful dream I never want to wake up from. Will you be mine forever? 💍"
    },
    {
        date: new Date(2026, 1, 9), // Feb 9
        name: "Chocolate Day",
        emoji: "🍫",
        message: "Life is like a box of chocolates, and you make it sweeter with every passing day.",
        quote: '"All you need is love. But a little chocolate now and then doesn\'t hurt." - Charles M. Schulz',
        customMessage: "Dear {name}, you are sweeter than the sweetest chocolate. My love for you is richer and deeper than any cocoa. 🍫"
    },
    {
        date: new Date(2026, 1, 10), // Feb 10
        name: "Teddy Day",
        emoji: "🧸",
        message: "A teddy bear is a friend you can hug anytime. Today, be someone's teddy!",
        quote: '"A teddy bear has no pretense. It is what it is, offering unconditional love."',
        customMessage: "Dear {name}, just like a teddy bear, I want to be your comfort, your warmth, and your forever cuddle buddy. 🧸"
    },
    {
        date: new Date(2026, 1, 11), // Feb 11
        name: "Promise Day",
        emoji: "🤞",
        message: "Promises are the uniquely human way of ordering the future. Make one today!",
        quote: '"A promise is a cloud; fulfillment is rain." - Arabian Proverb',
        customMessage: "Dear {name}, I promise to love you unconditionally, to support you always, and to make you smile every single day. 🤞"
    },
    {
        date: new Date(2026, 1, 12), // Feb 12
        name: "Hug Day",
        emoji: "🤗",
        message: "A hug is a perfect gift - one size fits all, and nobody minds if you exchange it!",
        quote: '"A hug is like a boomerang - you get it back right away." - Bil Keane',
        customMessage: "Dear {name}, in your arms is where I feel safest. Sending you the biggest, warmest, most loving hug! 🤗"
    },
    {
        date: new Date(2026, 1, 13), // Feb 13
        name: "Kiss Day",
        emoji: "💋",
        message: "A kiss is a lovely trick designed by nature to stop speech when words become superfluous.",
        quote: '"A kiss seals two souls for a moment in time." - Levende Waters',
        customMessage: "Dear {name}, your kisses are my favorite melody, and your love is my favorite song. 💋"
    },
    {
        date: new Date(2026, 1, 14), // Feb 14
        name: "Valentine's Day",
        emoji: "❤️",
        message: "Today we celebrate the greatest gift of all - Love! Happy Valentine's Day!",
        quote: '"Love is composed of a single soul inhabiting two bodies." - Aristotle',
        customMessage: "Dear {name}, you are my today, my tomorrow, and my forever. Happy Valentine's Day, my love! ❤️"
    }
];

// DOM Elements
const partnerSection = document.getElementById('partnerSection');
const welcomeSection = document.getElementById('welcomeSection');
const countdownSection = document.getElementById('countdownSection');
const todaysSpecial = document.getElementById('todaysSpecial');
const calendarSection = document.getElementById('calendarSection');
const letterSection = document.getElementById('letterSection');
const calendarGrid = document.getElementById('calendarGrid');
const popupOverlay = document.getElementById('popupOverlay');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    checkPartnerName();
    startCountdown();
});

// Create Floating Hearts Background
function createFloatingHearts() {
    const heartsBg = document.getElementById('heartsBg');
    const hearts = ['❤️', '💕', '💗', '💖', '💝', '🌹', '✨'];
    
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.animationDelay = Math.random() * 15 + 's';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
        heartsBg.appendChild(heart);
    }
}

// Check if partner name exists
function checkPartnerName() {
    const savedName = localStorage.getItem('valentinePartnerName');
    
    if (savedName) {
        showMainContent(savedName);
    }
}

// Save partner name
function savePartnerName() {
    const nameInput = document.getElementById('partnerName');
    const name = nameInput.value.trim();
    
    if (name) {
        localStorage.setItem('valentinePartnerName', name);
        showMainContent(name);
        showWelcomePopup(name);
    } else {
        nameInput.style.borderColor = '#ff4444';
        nameInput.placeholder = 'Please enter a name...';
        setTimeout(() => {
            nameInput.style.borderColor = '';
            nameInput.placeholder = "Enter your loved one's name...";
        }, 2000);
    }
}

// Show main content
function showMainContent(name) {
    // Hide partner input section
    partnerSection.classList.add('hidden');
    
    // Show welcome section
    welcomeSection.classList.remove('hidden');
    document.getElementById('displayName').textContent = name;
    
    // Show other sections
    countdownSection.classList.remove('hidden');
    todaysSpecial.classList.remove('hidden');
    calendarSection.classList.remove('hidden');
    letterSection.classList.remove('hidden');
    
    // Update footer name
    document.getElementById('footerName').textContent = name;
    
    // Generate calendar
    generateCalendar(name);
    
    // Show today's special
    showTodaysSpecial(name);
    
    // Load saved letter
    loadSavedLetter();
}

// Change name
function changeName() {
    welcomeSection.classList.add('hidden');
    countdownSection.classList.add('hidden');
    todaysSpecial.classList.add('hidden');
    calendarSection.classList.add('hidden');
    letterSection.classList.add('hidden');
    partnerSection.classList.remove('hidden');
    document.getElementById('partnerName').value = '';
}

// Show welcome popup
function showWelcomePopup(name) {
    const today = new Date();
    let todayEvent = null;
    
    // Check if today is a special day
    for (const day of valentineWeek) {
        if (isSameDay(today, day.date)) {
            todayEvent = day;
            break;
        }
    }
    
    if (todayEvent) {
        document.getElementById('popupEmoji').textContent = todayEvent.emoji;
        document.getElementById('popupTitle').textContent = `Happy ${todayEvent.name}!`;
        document.getElementById('popupMessage').textContent = todayEvent.customMessage.replace('{name}', name);
        document.getElementById('popupName').textContent = name;
        popupOverlay.classList.remove('hidden');
    }
}

// Close popup
function closePopup() {
    popupOverlay.classList.add('hidden');
}

// Check if two dates are the same day
function isSameDay(date1, date2) {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
}

// Start countdown to Chocolate Day (Feb 9)
function startCountdown() {
    const chocolateDay = new Date(2026, 1, 9, 23, 59, 59);
    
    function updateCountdown() {
        const now = new Date();
        const diff = chocolateDay - now;
        
        if (diff <= 0) {
            document.getElementById('countdownTitle').textContent = "🍫 Happy Chocolate Day! 🍫";
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Show today's special
function showTodaysSpecial(name) {
    const today = new Date();
    let todayEvent = null;
    let isValentineWeek = false;
    
    // Check if we're in Valentine's week
    const startDate = new Date(2026, 1, 7);
    const endDate = new Date(2026, 1, 14);
    
    if (today >= startDate && today <= endDate) {
        isValentineWeek = true;
        for (const day of valentineWeek) {
            if (isSameDay(today, day.date)) {
                todayEvent = day;
                break;
            }
        }
    }
    
    if (todayEvent) {
        document.getElementById('todayEmoji').textContent = todayEvent.emoji;
        document.getElementById('todayTitle').textContent = todayEvent.name;
        document.getElementById('todayMessage').textContent = todayEvent.customMessage.replace('{name}', name);
        document.getElementById('todayQuote').textContent = todayEvent.quote;
    } else {
        // Show a default message if not in Valentine's week
        document.getElementById('todayEmoji').textContent = '💕';
        document.getElementById('todayTitle').textContent = 'Every Day is Love Day';
        document.getElementById('todayMessage').textContent = `Dear ${name}, Valentine's Week is coming soon! Get ready to celebrate our love with 8 amazing days of romance and affection.`;
        document.getElementById('todayQuote').textContent = '"Love is not just for Valentine\'s Day, it\'s for every day." - Unknown';
    }
}

// Generate calendar
function generateCalendar(name) {
    calendarGrid.innerHTML = '';
    const today = new Date();
    
    valentineWeek.forEach((day, index) => {
        const card = document.createElement('div');
        card.className = 'day-card';
        
        // Check if it's today, past, or future
        if (isSameDay(today, day.date)) {
            card.classList.add('today');
        } else if (today > day.date) {
            card.classList.add('past');
        } else {
            card.classList.add('future');
        }
        
        const formattedDate = day.date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
        
        card.innerHTML = `
            ${isSameDay(today, day.date) ? '<div class="today-badge">TODAY</div>' : ''}
            <span class="day-emoji">${day.emoji}</span>
            <div class="day-date">${formattedDate}</div>
            <h3 class="day-name">${day.name}</h3>
            <p class="day-message">${day.message}</p>
        `;
        
        // Add click event to show popup
        card.addEventListener('click', () => {
            showDayPopup(day, name);
        });
        
        calendarGrid.appendChild(card);
    });
}

// Show day popup
function showDayPopup(day, name) {
    document.getElementById('popupEmoji').textContent = day.emoji;
    document.getElementById('popupTitle').textContent = `${day.name}`;
    document.getElementById('popupMessage').textContent = day.customMessage.replace('{name}', name);
    document.getElementById('popupName').textContent = name;
    popupOverlay.classList.remove('hidden');
}

// Save love letter
function saveLetter() {
    const letterInput = document.getElementById('loveLetter');
    const letter = letterInput.value.trim();
    
    if (letter) {
        localStorage.setItem('valentineLoveLetter', letter);
        showSavedLetter(letter);
        
        // Show confirmation
        const btn = document.querySelector('.send-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '✅ Saved!';
        btn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 2000);
    }
}

// Show saved letter
function showSavedLetter(letter) {
    const savedLetterDiv = document.getElementById('savedLetter');
    const letterContent = document.getElementById('letterContent');
    
    letterContent.textContent = letter;
    savedLetterDiv.classList.remove('hidden');
}

// Load saved letter
function loadSavedLetter() {
    const savedLetter = localStorage.getItem('valentineLoveLetter');
    
    if (savedLetter) {
        document.getElementById('loveLetter').value = savedLetter;
        showSavedLetter(savedLetter);
    }
}

// Close popup on overlay click
popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
        closePopup();
    }
});

// Close popup on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePopup();
    }
});

// Enter key to save name
document.getElementById('partnerName').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        savePartnerName();
    }
});
