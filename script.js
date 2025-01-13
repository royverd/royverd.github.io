const questionElement = document.getElementById('question');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const popup = document.getElementById('popup');
const bvid = document.getElementById('youtube-audio');


let questions = [
    "Will you go out with me? •ᴗ•",
    "Are you suuure???",
    "Really? Not even a little date?",
    "Come on, give me a chance!",
    "Please? Pretty please?",
    "I will even pay for it!",
    "Pweeeeeeese 🥺👉👈?",
    "Please, I beg you!",
    "I will take you to MacDonalds!〽️",
    "It will be fun, I swear!",
    "Why nooot :<, Pleeease? (⸝⸝⸝>﹏<⸝⸝⸝)",
    "Porfavor?💃",
    "Don't Make me beg for it! (I will)",
    "Ohhh, come ooon... think about it?",
    "Say yes or I'll just keep asking...",

];


let noClickCount = 0;
let yesClicked = false;
let isSwapped = false;  // Track if the buttons are currently swapped
let distanceMultiplier = 1;  // Initially, the popup will move 1x distance
let maxDistance = 1; // Limit the multiplier to 100% of the window's width/height
let remainingQuestions = [...questions.slice(1, questions.length - 1)];  // The remaining questions after the first one
let colorsSwapped = false;  // Track if the colors have been swapped
let isTyping = false;  // Flag to track typing status

function typeWriter(text, i = 0) {
    if (i < text.length) {
        questionElement.innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(text, i + 1), 50);
    } else {
        isTyping = false;  // Set flag to false once typing is complete
        yesBtn.disabled = false;  // Re-enable the buttons
        noBtn.disabled = false;
    }
}


function getRandomQuestion() {
    if (remainingQuestions.length === 0) {
        return null;  // All questions have been asked
    }
    // Randomly select a question from the remaining ones
    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    const selectedQuestion = remainingQuestions[randomIndex];

    // Remove the selected question from the remaining pool
    remainingQuestions = remainingQuestions.filter(question => question !== selectedQuestion);

    return selectedQuestion;
}

function showQuestion() {
    if (isTyping) return;  // Don't allow interaction if text is still typing

    questionElement.innerHTML = "";
    let currentQuestion;

    if (noClickCount === 0) {
        currentQuestion = questions[0];  // Always show initial question first
    } else {
        currentQuestion = getRandomQuestion();  // Select a random question afterwards
    }

    // After all random questions are displayed, show the last question
    if (remainingQuestions.length === 0) {
        currentQuestion = questions[questions.length - 1];  // Always show last question after random ones
    }

    if (currentQuestion) {
        isTyping = true;  // Set flag to true to prevent interaction
        yesBtn.disabled = true;  // Disable buttons during typing
        noBtn.disabled = true;
        typeWriter(currentQuestion);
    } else {
        questionElement.innerHTML = "You're breaking my heart... 😢";
        yesBtn.disabled = true;
        noBtn.disabled = true;
    }
}

function typeWriter(text, i = 0) {
        //document.getElementById('spinner').classList.remove('hidden'); // Show spinner when typing starts
    if (i < text.length) {
        questionElement.innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(text, i + 1), 50);
    } else {
        isTyping = false;
        yesBtn.disabled = false;
        noBtn.disabled = false;
        //document.getElementById('spinner').classList.add('hidden'); // Hide spinner once typing is done
    }
}

function movePopup() {

    const centerX = window.innerWidth / 2 - popup.offsetWidth / 2;
    const centerY = window.innerHeight / 2 - popup.offsetHeight / 2;


    if (yesClicked){
        // Set the popup to the exact center of the screen
        popup.style.left = `${centerX}px`;
        popup.style.top = `${centerY}px`;

    }else if (noClickCount > 2){
    
        // The random offsets from the center, multiplied by the distance multiplier
        const maxXOffset = (window.innerWidth - popup.offsetWidth) / 2 * distanceMultiplier;
        const maxYOffset = (window.innerHeight - popup.offsetHeight) / 2 * distanceMultiplier;
    
        const x = centerX + (Math.random() - 0.5) * 2 * maxXOffset;
        const y = centerY + (Math.random() - 0.5) * 2 * maxYOffset;
    
        // Constrain the popup within the window boundaries
        popup.style.left = `${Math.max(0, Math.min(x, window.innerWidth - popup.offsetWidth))}px`;
        popup.style.top = `${Math.max(0, Math.min(y, window.innerHeight - popup.offsetHeight))}px`;
    }

}

yesBtn.addEventListener('click', () => {
    yesClicked = true;
    movePopup();
    popup.innerHTML = "<h2>🥰✨ Yay! I'm so happy! ⸜(｡ ˃ ᵕ ˂ )⸝♡ ✨🥰</h2>";
});

noBtn.addEventListener('click', () => {
    noClickCount++;
    showQuestion();
    movePopup();

    // Swap buttons on every 3rd click (3, 6, 9, ...)
    if ((noClickCount % 3 === 0) || (isSwapped)) {
        swapButtonPosition();
    }

    document.body.className = `iteration${noClickCount}`;
    distanceMultiplier += 0.05;
});


function swapButtonPosition() {
    const buttonContainer = document.querySelector('.button-container');
    
    if (isSwapped) {
        // Swap back to the original position
        buttonContainer.insertBefore(yesBtn, noBtn);
    } else {
        // Swap positions
        buttonContainer.insertBefore(noBtn, yesBtn);
    }

    isSwapped = !isSwapped;  // Toggle the swap state
}

function showPopup() {
    const popup = document.getElementById('popup');
    popup.classList.add('popup-animation');
}

function sendResponse(response) {
    fetch('backend.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'response=' + encodeURIComponent(response)  // Use encodeURIComponent to handle special characters
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(data => {
        console.log('Success:', data);  // Logs the server's response
    })
    .catch(error => {
        console.error('Error:', error);  // Logs any errors during the fetch
    });
}

/* Volume Slider (NOT IMPLEMENTED)
// Get the volume slider element
const volumeSlider = document.getElementById('volumeSlider');

// Function to update the volume based on the slider value
volumeSlider.addEventListener('input', function() {
    const volume = volumeSlider.value;  // Get the slider value (0 to 100)
    const volumePercentage = volume / 100;  // Convert to percentage
    if (player) {
        player.setVolume(volume);  // Set volume in the YouTube player
    }
});
*/

/* Failed Attempt at Youtube Audio Handling
// Variables
var player;

 YouTube API callback function
function onYouTubeIframeAPIReady() {
  // Create the YouTube player
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: 'youtube-audio',
    events: {
      'onReady': onPlayerReady
    }
  });
} 

// Function called when the player is ready
function onPlayerReady(event) {
  // You can set the initial volume here if needed
  event.target.setVolume(0.5);
}*/

window.onload = function() {
    showQuestion();
} 