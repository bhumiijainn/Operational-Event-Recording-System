// ======================================
// Voice Input for Digital Logbook
// ======================================

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

if (!SpeechRecognition) {

    alert("Voice Recognition is not supported in this browser.");

} else {

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    let currentField = null;

    // Start voice input
    function startVoiceInput(fieldId) {

        currentField = document.getElementById(fieldId);

        if (!currentField) return;

        recognition.start();

    }

    recognition.onresult = function (event) {

        const text = event.results[0][0].transcript;

        currentField.value = text;

    };

    recognition.onerror = function (event) {

        alert("Voice Error : " + event.error);

    };

}