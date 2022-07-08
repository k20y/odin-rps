
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

function userPlay()
{
    let input="";
    do
    {
        input=prompt("Choose your emotion");
        input=input.toLowerCase();

        switch(input)
        {
            default:
                alert(`${input} is not a valid emotion. Try again`);
                input="";
                break;
            case 'happy': return 'h';
            case 'angry': return 'a';
            case   'sad': return 's';
        }

    }while(!input);
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
    if(userInput == computerInput)
    {
        alert("It's a tie!");
        return 'tie';
    }

    let computerEmotion=getEmotion(computerInput),
        userEmotion=getEmotion(userInput);


    switch(userInput+computerInput)
    {
        case 'ha':
        case 'as':
        case 'sh':
            alert(`You win! ${userEmotion} beats ${computerEmotion}!`);
            return 'user';

        default:
            alert(`You lose! ${computerEmotion} beats ${userEmotion}!`);
            return 'computer';
    }
}

function game()
{
    let userScore=0,
        computerScore=0;

    while(userScore < 5 && computerScore < 5)
    {
        let winner=round(userPlay(),computerPlay());
        if(winner == 'user') userScore++;
        else if(winner == 'computer') computerScore++;
    }

    if(userScore > computerScore) alert("You are the winner!");
    else alert("OMORI is the winner!");
}

game();