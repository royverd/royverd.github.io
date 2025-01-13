const questionElement = document.getElementById('question');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const popup = document.getElementById('popup');
const bvid = document.getElementById('youtube-audio');
const randomBG = Math.floor(Math.random() * 5) + 1;
const typingSound = document.getElementById('typingSound');
const bgaudio = document.getElementById('bg-audio');
const msclick = document.getElementById('ms-click');

let questions = [
    "Will you go on a date with me? •ᴗ•",
    "Are you *not* suuure???",
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
    "Come on, all the cool kids are doing it!",
    "Onegaishimasuuu!! ♡UωU♡",
    "Say yes or I'll just keep asking...",
];



let colorsSwapped = false;  // Track if the colors have been swapped
let isTyping = false;  // Flag to track typing status
let yesClicked = false;
let isSwapped = false;  // Track if the buttons are currently swapped
let noClickCount = 0;
let distanceMultiplier = 1;  // Initially, the popup will move 1x distance
let maxDistance = 1; // Limit the multiplier to 100% of the window's width/height
let remainingQuestions = [...questions.slice(1, questions.length - 1)];  // The remaining questions after the first one
let trigger_easter_egg = 42;
let trigger_real_easter_egg = 100;


yesBtn.addEventListener("click", () => {

    //yesClicked = true;

    // Redirect to YouTube video
    //window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Replace with your desired YouTube link

    // Handle Audio
    msclick.play();
    bgaudio.pause();

    // Open YouTube video in a new tab

    // Easter Eggs
    if (noClickCount < trigger_easter_egg) {
        // noClickCount is less than 42, so trigger normal final Iteration
                
        //Perform Final Iteration
        document.body.className = `iteration-final iteration-final-bg${randomBG}`;
        // Disable buttons
        yesBtn.disabled = true;
        noBtn.disabled = true;
        //Re-center Pop-up
        movePopup();
        popup.innerHTML = "<h2>How silly of you •ᴗ•</h2>";
        window.open("https://www.youtube.com/watch?v=hvL1339luv0", "_blank");

    } else if (noClickCount === trigger_easter_egg) {
        
        // noClickCount is exactly 42, trigger the Easter egg
        //Perform Easter Egg Iteration
        document.body.className = `iteration-final iteration-final-bge`;
        
        //Re-center Pop-up
        movePopup();
        window.open("https://www.youtube.com/watch?v=aboZctrHfK8", "_blank");


    } else if (noClickCount >= trigger_real_easter_egg) {
        // noClickCount is 100 or more, trigger the real Easter egg
        
        //Perform Final Iteration
        document.body.className = `iteration-final iteration-final-bgre`;
        
        //Re-center Pop-up
        movePopup();

        // Disable buttons
        yesBtn.disabled = true;
        noBtn.disabled = true;

        // Update the popup content
        popup.innerHTML = "<h1>Goose of Shame</h1>";
        window.open("https://www.youtube.com/watch?v=BWn1yrXA9e0", "_blank");
    }
});


noBtn.addEventListener('click', () => {

    // Play Mouse Click
    msclick.play();
    
    noClickCount++;
    showQuestion();
    movePopup();

    // Swap buttons on every 3rd click (3, 6, 9, ...)
    if ((noClickCount % 3 === 0) || (isSwapped) || (noClickCount == 8)) {
        swapButtonPosition();
    }

    // "Easter Egg"
    if (noClickCount == trigger_easter_egg){
        yesBtn.dispatchEvent(new Event('click'));
    }

    // Real "Easter Egg"
    if (noClickCount == trigger_real_easter_egg){
        yesBtn.dispatchEvent(new Event('click'));
    }
    document.body.className = `iteration${noClickCount}`;
    distanceMultiplier += 0.05;
});

/**Gets one random question from the remaining questions array */
function getRandomQuestion() { 
    if (remainingQuestions.length === 0) {
        return null;  // All questions have been asked
    }
    // Randomly select a question from the remaining ones
    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    const selectedQuestion = remainingQuestions[randomIndex];

    // Remove the selected question from the remaining pool
    remainingQuestions.splice(randomIndex, 1);  // Properly removes the question from the array

    return selectedQuestion;
}

/**Displays currentQuestion in the question element */
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

/**Types questionElement letter by letter */
function typeWriter(text, i = 0) {
        //document.getElementById('spinner').classList.remove('hidden'); // Show spinner when typing starts
    if (i < text.length) {
        questionElement.innerHTML += text.charAt(i);
        // Play typing sound
        //typingSound.play();
        playTypingSoundWithDelay(50, typingSound);
        setTimeout(() => typeWriter(text, i + 1), 50);
    } else {
        isTyping = false;
        yesBtn.disabled = false; // Set flag to false once typing is complete
        noBtn.disabled = false; // Re-enable the buttons
        //document.getElementById('spinner').classList.add('hidden'); // Hide spinner once typing is done
    }
}

/**Adjusts the position of the popup class element */
function movePopup() {
    const centerX = window.innerWidth / 2 - popup.offsetWidth / 2;
    const centerY = window.innerHeight / 2 - popup.offsetHeight / 2;

    if (yesClicked || noClickCount > questions.length - 3) {
        // Set the popup to the exact center of the screen
        popup.style.left = `${Math.max(0, Math.min(centerX, window.innerWidth - popup.offsetWidth))}px`;
        popup.style.top = `${Math.max(0, Math.min(centerY, window.innerHeight - popup.offsetHeight))}px`;

    } else if (noClickCount > 2) {
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



/**Simply swaps the yes and no buttons positions */
function swapButtonPosition() {
    const buttonContainer = document.querySelector('.button-container');
    
    if (isSwapped) {
        // Swap back to the original position
        buttonContainer.insertBefore(yesBtn, noBtn);
    } else if (noClickCount < questions.length - 3) {
        // Swap positions
        buttonContainer.insertBefore(noBtn, yesBtn);
    }

    isSwapped = !isSwapped;  // Toggle the swap state
}

/** Sends a string as response to the php server */
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

// Function to adjust playback rate and play sound dynamically using the audio element's ID
function playTypingSoundWithDelay(delayInMs, audioId) {
    // Get the audio element by ID
    const audioElement = audioId;
    
    // Check if the audio element exists
    if (!audioElement) {
        console.error('Audio element with the provided ID not found.');
        return;
    }

    // Wait for the audio metadata to be loaded (e.g., duration)
    //audioElement.onloadedmetadata = function() {
    // Get the audio duration in seconds
    var soundDuration = audioElement.duration;  // duration in seconds

    // Calculate playback rate based on the desired delay (in milliseconds) and sound duration
    // Example: If delay is 50ms and sound duration is 0.5s, we want the sound to stretch/compress accordingly
    var playbackRate = soundDuration / (delayInMs / 1000); // Convert delay from ms to seconds

    // Apply pitch variation (random value between 0.8 and 1.2)
    //var pitchVariation = Math.random() * 0.4 + 0.8;  // Random value between 0.8 and 1.2

    // Adjust the playbackRate for both speed and pitch variation
    //playbackRate *= pitchVariation;

    // Set the playback rate to control both speed and pitch
    audioElement.volume = 0.2;
    audioElement.playbackRate = playbackRate;

    // Play the sound
    audioElement.play();
    //};
}

/** Dictates Bg Music Behaviour */
function playBgMusic() {
    const bgaudio = document.getElementById('bg-audio'); // Assuming you're using an element with this ID

    // Start the audio at volume 0 (muted)
    bgaudio.volume = 0;
    bgaudio.play();

    // Calculate how much the volume should increase each step
    const targetVolume = 0.025;
    const fadeDuration = 9000; // 3 seconds
    const increment = targetVolume / (fadeDuration / 50); // 50ms interval

    // Gradually increase the volume over 3 seconds
    let fadeInInterval = setInterval(() => {
        if (bgaudio.volume < targetVolume) {
            bgaudio.volume += increment; // Increase volume by the calculated increment
        } else {
            // Stop the interval once the target volume is reached
            clearInterval(fadeInInterval);
        }
    }, 50); // Interval every 50ms
}

/** Basic Functionality Initialization */
function init() {
    msclick.playbackRate = 2;
    msclick.volume = 0.2;
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

/* Failed Attempt at Youtube Video Playback & Audio Handling
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
    init();
    showQuestion();
    playBgMusic();
} 