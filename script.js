/*9. QUICK EXIT */

function quickExit() {

    // Neutral website
    window.location.replace("https://www.google.com");

}



/*10. FAKE INCOMING CALL*/

function startFakeCall() {

    const modal = document.getElementById("callModal");

    modal.classList.add("show");

}


function acceptCall() {

    document.getElementById("callModal")
        .classList.remove("show");

}


function declineCall() {

    document.getElementById("callModal")
        .classList.remove("show");

}


/* Clicking outside the call screen closes it */

document.getElementById("callModal").addEventListener(
    "click",
    function(event) {

        if (event.target === this) {

            this.classList.remove("show");

        }

    }
);



/* 11. VOICE ACTIVATED SOS */

let recognition = null;


function startVoiceSOS() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        alert(
            "Voice recognition is not supported in this browser."
        );

        return;

    }


    recognition =
        new SpeechRecognition();


    recognition.lang = "en-US";

    recognition.continuous = false;

    recognition.interimResults = false;


    const mic =
        document.getElementById("micCircle");

    const title =
        document.getElementById("voiceTitle");

    const status =
        document.getElementById("voiceStatus");

    const button =
        document.getElementById("voiceButton");


    mic.classList.add("listening");

    title.innerText = "Listening...";

    status.innerText =
        'Say "SOS" or "Help".';

    button.innerText =
        "🎤 Listening...";


    try {

        recognition.start();

    } catch (error) {

        console.log(error);

    }


    recognition.onresult = function(event) {

        const spokenText =
            event.results[0][0].transcript
                .toLowerCase();


        console.log(
            "Recognized:",
            spokenText
        );


        mic.classList.remove("listening");

        button.innerText =
            "🎤 Start Listening";


        if (
            spokenText.includes("sos") ||
            spokenText.includes("help")
        ) {

            title.innerText =
                "🚨 SOS Activated!";

            status.innerText =
                "Emergency voice command detected.";


            /*
               IMPORTANT: when  merge this Feature 4 Emergency SOS,
               call their existing SOS function here.

            */


            activateVoiceSOS();


        } else {

            title.innerText =
                "Command Not Recognized";

            status.innerText =
                'Please try again and say "SOS".';

        }

    };


    recognition.onerror = function(event) {

        console.log(
            "Speech error:",
            event.error
        );


        mic.classList.remove("listening");

        button.innerText =
            "🎤 Start Listening";


        status.innerText =
            "Could not hear you. Please try again.";

    };


    recognition.onend = function() {

        mic.classList.remove("listening");

        button.innerText =
            "🎤 Start Listening";

    };

}


function activateVoiceSOS() {

    alert(
        "🚨 SOS ACTIVATED!\n\n" +
        "Emergency assistance has been requested."
    );

}



/*12. SAFETY QUIZ*/

const questions = [

    {
        question:
            "What should you do if you feel unsafe while traveling alone?",

        options: [
            "Ignore the situation",
            "Move to a crowded or safe place",
            "Share your password",
            "Stay alone"
        ],

        answer: 1
    },


    {
        question:
            "Which information should you never share with strangers online?",

        options: [
            "Favorite color",
            "Personal password",
            "Favorite food",
            "Favorite movie"
        ],

        answer: 1
    },


    {
        question:
            "What should you do during an emergency?",

        options: [
            "Stay calm and seek help",
            "Turn off your phone",
            "Ignore the situation",
            "Go somewhere isolated"
        ],

        answer: 0
    },


    {
        question:
            "Which password is strongest?",

        options: [
            "12345678",
            "password",
            "Bristy@2026!",
            "abcdef"
        ],

        answer: 2
    },


    {
        question:
            "Which is generally safer during an emergency?",

        options: [
            "An isolated street",
            "An empty building",
            "A crowded public place",
            "A dark area"
        ],

        answer: 2
    }

];


let currentQuestion = 0;

let score = 0;

let answered = false;


function loadQuestion() {

    answered = false;


    const data =
        questions[currentQuestion];


    document.getElementById("questionCounter")
        .innerText =
        `Question ${currentQuestion + 1} of ${questions.length}`;


    document.getElementById("quizScore")
        .innerText =
        `Score: ${score}`;


    document.getElementById("question")
        .innerText =
        data.question;


    const answers =
        document.getElementById("answers");


    answers.innerHTML = "";


    data.options.forEach(
        function(option, index) {

            const button =
                document.createElement("button");


            button.className =
                "answer";


            button.innerText =
                `${String.fromCharCode(65 + index)}. ${option}`;


            button.onclick =
                function() {

                    selectAnswer(
                        index,
                        button
                    );

                };


            answers.appendChild(button);

        }
    );


    document.getElementById("nextBtn")
        .disabled = true;


    const progress =
        ((currentQuestion + 1) /
        questions.length) * 100;


    document.getElementById("progressBar")
        .style.width =
        `${progress}%`;

}


function selectAnswer(index, selectedButton) {

    if (answered) {
        return;
    }


    answered = true;


    const correct =
        questions[currentQuestion].answer;


    const allAnswers =
        document.querySelectorAll(".answer");


    allAnswers.forEach(
        function(button, i) {

            button.disabled = true;


            if (i === correct) {

                button.classList.add("correct");

            }

        }
    );


    if (index === correct) {

        score++;

        selectedButton.classList.add("correct");

    } else {

        selectedButton.classList.add("wrong");

    }


    document.getElementById("quizScore")
        .innerText =
        `Score: ${score}`;


    document.getElementById("nextBtn")
        .disabled = false;

}


function nextQuestion() {

    currentQuestion++;


    if (currentQuestion >= questions.length) {

        showResult();

        return;

    }


    loadQuestion();

}


function showResult() {

    document.getElementById("question")
        .style.display = "none";


    document.getElementById("answers")
        .style.display = "none";


    document.getElementById("nextBtn")
        .style.display = "none";


    document.getElementById("quizResult")
        .classList.remove("hidden");


    document.getElementById("resultText")
        .innerText =
        `You scored ${score} out of ${questions.length}.`;

}


function restartQuiz() {

    currentQuestion = 0;

    score = 0;


    document.getElementById("question")
        .style.display = "block";


    document.getElementById("answers")
        .style.display = "grid";


    document.getElementById("nextBtn")
        .style.display = "block";


    document.getElementById("quizResult")
        .classList.add("hidden");


    loadQuestion();

}


loadQuestion();



/* 13. PASSWORD STRENGTH CHECKER*/

function checkPassword() {

    const password =
        document.getElementById("passwordInput")
            .value;


    const length =
        password.length >= 8;


    const upper =
        /[A-Z]/.test(password);


    const lower =
        /[a-z]/.test(password);


    const number =
        /[0-9]/.test(password);


    const special =
        /[^A-Za-z0-9]/.test(password);


    updateRule(
        "ruleLength",
        length,
        "At least 8 characters"
    );


    updateRule(
        "ruleUpper",
        upper,
        "Contains uppercase letter"
    );


    updateRule(
        "ruleLower",
        lower,
        "Contains lowercase letter"
    );


    updateRule(
        "ruleNumber",
        number,
        "Contains a number"
    );


    updateRule(
        "ruleSpecial",
        special,
        "Contains special character"
    );


    let strength = 0;


    if (length) strength++;

    if (upper) strength++;

    if (lower) strength++;

    if (number) strength++;

    if (special) strength++;


    const bars = [

        document.getElementById("bar1"),

        document.getElementById("bar2"),

        document.getElementById("bar3"),

        document.getElementById("bar4")

    ];


    bars.forEach(
        bar => {
            bar.style.background = "#ddd";
        }
    );


    const text =
        document.getElementById("strengthText");


    if (password.length === 0) {

        text.innerText =
            "Enter a password";

        return;

    }


    if (strength <= 2) {

        text.innerText =
            "Weak ❌";

        bars[0].style.background =
            "#e23d4d";

    }


    else if (strength === 3) {

        text.innerText =
            "Medium ⚠️";

        bars[0].style.background =
            "#f0a12b";

        bars[1].style.background =
            "#f0a12b";

    }


    else if (strength === 4) {

        text.innerText =
            "Good 👍";

        bars[0].style.background =
            "#e4bd3d";

        bars[1].style.background =
            "#e4bd3d";

        bars[2].style.background =
            "#e4bd3d";

    }


    else {

        text.innerText =
            "Strong ✅";

        bars.forEach(
            bar => {
                bar.style.background =
                    "#2da34a";
            }
        );

    }

}


function updateRule(
    id,
    valid,
    text
) {

    const element =
        document.getElementById(id);


    if (valid) {

        element.classList.add("valid");

        element.innerText =
            "✓ " + text;

    } else {

        element.classList.remove("valid");

        element.innerText =
            "○ " + text;

    }

}


function togglePassword() {

    const input =
        document.getElementById("passwordInput");


    if (input.type === "password") {

        input.type = "text";

    } else {

        input.type = "password";

    }

}



/* 14. LIVE LOCATION */

function getLocation() {

    const status =
        document.getElementById("locationStatus");


    status.innerText =
        "Finding location...";


    if (!navigator.geolocation) {

        status.innerText =
            "Geolocation not supported.";

        return;

    }


    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;


            const longitude =
                position.coords.longitude;


            document.getElementById("latitude")
                .innerText =
                latitude.toFixed(6);


            document.getElementById("longitude")
                .innerText =
                longitude.toFixed(6);


            status.innerText =
                "Location found ✓";


            showGoogleMap(
                latitude,
                longitude
            );


            getWeather(
                latitude,
                longitude
            );

        },


        function(error) {

            console.log(error);


            status.innerText =
                "Location permission denied.";

        },


        {
            enableHighAccuracy: true,

            timeout: 10000,

            maximumAge: 0

        }

    );

}



/*GOOGLE MAP*/

function showGoogleMap(
    latitude,
    longitude
) {

    const map =
        document.getElementById("map");


    map.innerHTML = `

        <iframe
            src="https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed"
            loading="lazy"
            allowfullscreen>
        </iframe>

    `;

}



/* LIVE WEATHER
   Open-Meteo API */

async function getWeather(
    latitude,
    longitude
) {

    try {

        const url =
            `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${latitude}` +
            `&longitude=${longitude}` +
            `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "Weather API failed"
            );

        }


        const data =
            await response.json();


        const current =
            data.current;


        document.getElementById("temperature")
            .innerText =
            `${Math.round(current.temperature_2m)}°C`;


        document.getElementById("humidity")
            .innerText =
            `${current.relative_humidity_2m}%`;


        document.getElementById("wind")
            .innerText =
            `${Math.round(current.wind_speed_10m)} km/h`;


        document.getElementById(
            "weatherCondition"
        ).innerText =
            getWeatherDescription(
                current.weather_code
            );

    }


    catch (error) {

        console.error(error);


        document.getElementById(
            "weatherCondition"
        ).innerText =
            "Weather unavailable";

    }

}



/* Weather code → readable condition */

function getWeatherDescription(code) {

    if (code === 0) {
        return "☀️ Clear Sky";
    }

    if (code <= 3) {
        return "⛅ Partly Cloudy";
    }

    if (code <= 48) {
        return "🌫️ Foggy";
    }

    if (code <= 57) {
        return "🌦️ Drizzle";
    }

    if (code <= 67) {
        return "🌧️ Rain";
    }

    if (code <= 77) {
        return "❄️ Snow";
    }

    if (code <= 82) {
        return "🌧️ Rain Showers";
    }

    if (code <= 99) {
        return "⛈️ Thunderstorm";
    }

    return "Weather information available";

}