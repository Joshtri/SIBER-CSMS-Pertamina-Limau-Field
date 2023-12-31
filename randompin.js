function generateRandomPin() {
    const length = 10;
    let pin = '';
    for (let i = 0; i < length; i++) {
        pin += Math.floor(Math.random() * 10);
    }
    return pin;
}

const randomPin = generateRandomPin();
console.log(randomPin);
