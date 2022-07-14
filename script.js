
const computerOutput = document.querySelector('.omori');
const bttns = document.querySelectorAll('input');
const resetBttn = document.querySelector('.reset');
const output = document.querySelector('.output');

const userScoreText = document.querySelector('.uScore');
const computerScoreText = document.querySelector('.cScore');
const computerOutputPath = computerOutput.src;

let userScore = 0,
    computerScore = 0;
let winner = false;

function computerPlay()
{
    let rng = Math.floor(Math.random() * 3);
    
    switch(rng)
    {
        case 0: return 'h';
        case 1: return 'a';
        case 2: return 's';
    }
}

function getEmotion(input)
{
    switch(input)
    {
        default: return null;
        case 'h': return 'Happy';
        case 'a': return 'Angry';
        case 's': return 'Sad';
    }
}

function round(userInput,computerInput)
{
    let computerEmotion=getEmotion(computerInput),
    userEmotion=getEmotion(userInput);
    
    //Change OMORI's emotion
    computerOutput.src = `${computerOutput.src.slice(0, -5)}-${computerEmotion}.webp`;
    
    if(userInput == computerInput)
    {
        output.textContent = "It's a tie!";
        return 'tie';
    }

    switch(userInput+computerInput)
    {
        case 'ha':
        case 'as':
        case 'sh':
            output.textContent = `You win! ${userEmotion} beats ${computerEmotion}!`;
            userScore++;
            break;
            default:
            output.textContent = `You lose! ${computerEmotion} beats ${userEmotion}!`;
            computerScore++;
            break;
    }
}

function reset()
{
    unselect();
    output.textContent='';
    userScore=0,computerScore=0;
    winner = false;
    userScoreText.textContent = '0';
    computerScoreText.textContent = '0';
}

resetBttn.addEventListener('click', reset);

bttns.forEach(bttn => {
    
    bttn.addEventListener('click', () =>{

        //ignore if someone won already
        if(winner) return;

        //unselect the other buttons
        unselect();

        //select the clicked button
        bttn.src = bttn.src.slice(0,-5) + '-Selected.webp';

        //simulate the round
        round(bttn.className,computerPlay());
        
        //update the score
        userScoreText.textContent = userScore;
        computerScoreText.textContent = computerScore;

        //check for a winner

        if(userScore >= 5 || computerScore >= 5)
        {
            winner = true;
            output.textContent =`${(userScore > computerScore) ? 'You' : 'OMORI'} won!`;
        }
    });

});

function unselect()
{
    computerOutput.src = computerOutputPath;
    bttns.forEach(bttn =>{
    
    if(bttn.src.includes('Selected'))
    {
        //we remove the last 14 characters and concatenate .webp
        bttn.src = bttn.src.slice(0,-14) + '.webp';
    }

    });
}