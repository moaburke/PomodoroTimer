//State wheter timer is playing or paused
let isPlay = false;

//State wheter timer is in break mode
let isBreak = false;

//Elapsed time (in seconds)
let totalSecond = 0;
let timer = null;

//Initial value for focus time in minutes
let countMFocus = 25;
let countS = "00";

//Initial value for break time in minutes
let countMBreak = 5;

//Set initial values for focus and break time
document.getElementById("chooseTimeValueStudy").innerText = countMFocus; //Focus
document.getElementById("chooseTimeValueBreak").innerText = countMBreak; //Break

//Function to add zero padding to numbers less than 10
function zeroPadding(number) {
    return ("00" + number).slice(-2); //Ensures two digits with leading zeros
}

//Declares focus time by 1 min
document.getElementById("minusTimeStudy").addEventListener("click",  () => {
    //Cannot change is value is less than or equa to 1, or if playing
    if (countMFocus > 1 && isPlay == false ) {
        countMFocus = countMFocus - 1;
        document.getElementById("chooseTimeValueStudy").innerText = countMFocus;
        // Update display for focus time
        document.querySelector(".m").innerText = zeroPadding(countMFocus);
    }
});

//Increase focus time by 1 minute
document.getElementById("plusTimeStudy").addEventListener("click",  () => {
    //Cannot change if value is greater than or equal to 99, or if playing
    if (countMFocus < 99 && isPlay == false) {
        countMFocus = countMFocus + 1;
        document.getElementById("chooseTimeValueStudy").innerText = countMFocus;
        // Update display for focus time
        document.querySelector(".m").innerText = zeroPadding(countMFocus);
    }
});

//Decrese break time by 1 minute
document.getElementById("minusTimeBreak").addEventListener("click",  () => {
    //Cannot change if value is less than or equal to 1 or if playing
    if (countMBreak > 1 && isPlay == false){
        countMBreak = countMBreak - 1;
        document.getElementById("chooseTimeValueBreak").innerText = countMBreak;
    }
});

//Increase break time by 1 minute
document.getElementById("plusTimeBreak").addEventListener("click",  () => {
    //Cannot change if value is greater than or equal to 99, or if playing
    if (countMBreak < 99 && isPlay == false){
        countMBreak = countMBreak + 1;
        document.getElementById("chooseTimeValueBreak").innerText = countMBreak;
    }
});

//When start button is clicked
document.getElementById("actionButtonStart").addEventListener("click", function () {
    if (isPlay) { //Cannot click if already playing
    } else {
        document.querySelector(".whatToDo").innerHTML = "Stay Focused";
        
            //Start the timer
            const startDate = Date.now(); // Milliseconds since Jan 1, 1970
            const limit = countMFocus * 60; //Limit in seconds

            //Disable buttons during countdown
            document.getElementById("minusTimeStudy").classList.add("minusTimeStudyNone");
            document.getElementById("plusTimeStudy").classList.add("plusTimeStudyNone");
            document.getElementById("minusTimeBreak").classList.add("minusTimeBreakNone");
            document.getElementById("plusTimeBreak").classList.add("plusTimeBreakNone");

            //Change color to indicate disabled state
            document.getElementById("minusTimeStudy").style.color = "#8b7c91";
            document.getElementById("plusTimeStudy").style.color = "#8b7c91";
            document.getElementById("minusTimeBreak").style.color = "#8b7c91";
            document.getElementById("plusTimeBreak").style.color = "#8b7c91";

            //Hide start button
            document.getElementById("actionButtonStart").classList.add("actionButtonStartNone");
            //Show clear button
            document.getElementById("actionButtonClear").classList.remove("actionButtonClearNone");

            //Start timer
            timer = setInterval(function () {
                totalSecond = parseInt((Date.now() - startDate) / 1000);

                //When timer reached 0, switch to break mode
                if ((parseInt((limit - totalSecond)) < 0) ) {

                    //Set break mode
                    isBreak = true;

                    //Change displayed text
                    document.querySelector(".whatToDo").innerHTML = "Take a Break";

                    //Change background and text colors
                    document.body.style.backgroundColor = "#E69A8DFF";
                    document.body.style.color = "#5F4B8BFF";

                    //Change clear button color (for break)
                    document.getElementById("actionButtonClear").classList.add("actionButtonBreak");

                    //Change button colors
                    document.getElementById("minusTimeStudy").style.color = "#94859a";
                    document.getElementById("plusTimeStudy").style.color = "#94859a";
                    document.getElementById("minusTimeBreak").style.color = "#94859a";
                    document.getElementById("plusTimeBreak").style.color = "#94859a";
                            
                    //Set initial value for break time
                    const limitBreak = (countMBreak * 60) + (countMFocus * 60);
        
                    //When break time is over, reset to initial values
                    if ((parseInt((limitBreak - totalSecond)) < 0) ) {
                        //Changed displayed text
                        document.querySelector(".whatToDo").innerHTML = "Start Session";

                        //Clear the timer
                        clearInterval(timer);
                        //Set playing state to false
                        isPlay = false; 
                        //Set break status to false
                        isBreak = false; 

                        // Update display for focus time (minutes)
                        document.querySelector(".m").innerText = zeroPadding(countMFocus);
                        // Update displat for seconds
                        document.querySelector(".s").innerText = zeroPadding(countS);

                        //Enable buttons
                        document.getElementById("minusTimeStudy").classList.remove("minusTimeStudyNone");
                        document.getElementById("plusTimeStudy").classList.remove("plusTimeStudyNone");
                        document.getElementById("minusTimeBreak").classList.remove("minusTimeBreakNone");
                        document.getElementById("plusTimeBreak").classList.remove("plusTimeBreakNone");

                        //Change button colors (enabled)    
                        document.getElementById("minusTimeStudy").style.color = "#E69A8DFF";
                        document.getElementById("plusTimeStudy").style.color = "#E69A8DFF";
                        document.getElementById("minusTimeBreak").style.color = "#E69A8DFF";
                        document.getElementById("plusTimeBreak").style.color = "#E69A8DFF";

                        //Show start button
                        document.getElementById("actionButtonStart").classList.remove("actionButtonStartNone");
                        //Hide clear button
                        document.getElementById("actionButtonClear").classList.add("actionButtonClearNone");
                        //Change clear button color (for focus time)
                        document.getElementById("actionButtonClear").classList.remove("actionButtonBreak");

                        //Reset background and text colors
                        document.body.style.backgroundColor = "#5F4B8BFF";
                        document.body.style.color = "#E69A8DFF";
                    } else {
                        // Update display for remaining minutes
                        document.querySelector(".m").innerText = zeroPadding(
                            parseInt((limitBreak - totalSecond) / 60)
                        );
                        //Update display for remaining seconds
                        document.querySelector(".s").innerText = zeroPadding(
                            (limitBreak - totalSecond) % 60
                        );
                        //Set playing state to true
                        isPlay = true;
                    }

                } else {
                    //Update display for remaining minutes
                    document.querySelector(".m").innerText = zeroPadding(
                        parseInt((limit - totalSecond) / 60)
                    );
                    //Update display for remaining seconds
                    document.querySelector(".s").innerText = zeroPadding(
                        (limit - totalSecond) % 60
                    );
                    //Set playing state to true
                    isPlay = true;
                }  
            }, 100);  
        }
    }
);

//When clear button is clicked, reset to initial values
document.getElementById("actionButtonClear").addEventListener("click", function () {
    if (isPlay) {
        //Clear the timer
        clearInterval(timer);
        timer = null;
        //Set playing state to false
        isPlay = false;
        //Set break status to false
        isBreak = false;
        //Update display for minutes
        document.querySelector(".m").innerText = zeroPadding(countMFocus);
        //Update display for seconds
        document.querySelector(".s").innerText = zeroPadding(countS);

        //Change displayed text
        document.querySelector(".whatToDo").innerHTML = "Start Session";

        //Enable buttons
        document.getElementById("minusTimeStudy").classList.remove("minusTimeStudyNone");
        document.getElementById("plusTimeStudy").classList.remove("plusTimeStudyNone");
        document.getElementById("minusTimeBreak").classList.remove("minusTimeBreakNone");
        document.getElementById("plusTimeBreak").classList.remove("plusTimeBreakNone");
        
        //Change button colors (enabled)
        document.getElementById("minusTimeStudy").style.color = "#E69A8DFF";
        document.getElementById("plusTimeStudy").style.color = "#E69A8DFF";
        document.getElementById("minusTimeBreak").style.color = "#E69A8DFF";
        document.getElementById("plusTimeBreak").style.color = "#E69A8DFF";

        //Show start button
        document.getElementById("actionButtonStart").classList.remove("actionButtonStartNone");
        //Hide clear button
        document.getElementById("actionButtonClear").classList.add("actionButtonClearNone");
        //Change clear button color for focus time
        document.getElementById("actionButtonClear").classList.remove("actionButtonBreak");

        //Reset background and text colors
        document.body.style.backgroundColor = "#5F4B8BFF";
        document.body.style.color = "#E69A8DFF";
    }
});