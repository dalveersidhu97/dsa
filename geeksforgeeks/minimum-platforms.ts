
const inputs = [
    {
        arrivals: [900, 940, 950, 1100, 1500, 1800],
        departures: [910, 1200, 1120, 1130, 1900, 2000],
        answer: 3
    },
    {
        arrivals: [900, 1235, 1100],
        departures: [1000, 1240, 1200],
        answer: 1
    },
    {
        arrivals: [1000, 935, 1100],
        departures: [1200, 1240, 1130],
        answer: 3
    }
];

for (let input of inputs) {
    const { arrivals, departures, answer } = input;
    arrivals.sort((a, b) => a - b);
    departures.sort((a, b) => a - b);

    const findPlatform = () => {
        let a = 0;
        let d = 0;
        let platformsOccupied = 0;
        let max = 0;

        while (a < arrivals.length && d < arrivals.length) {
            const nextDeparture = departures[d];
            const nextArrival = arrivals[a];
            if (nextArrival <= nextDeparture) {
                a++;
                platformsOccupied++;
                max = platformsOccupied > max ? platformsOccupied : max;
            } else {
                d++;
                platformsOccupied--;
            }
        }
        return max;
    }
    const myAnswer = findPlatform();

    console.log(myAnswer, myAnswer === answer ? 'Correct': 'Incorrect');
}

