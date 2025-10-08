'use strict';

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; // Clear existing movements

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// displayMovements(account1.movements);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};

// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposite => (deposite * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// calcDisplaySummary(account1.movements);

// **challenge 1**

// const juliaData = [3, 5, 2, 12, 7];
// const kateData = [4, 1, 15, 8, 3];

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0, 1);
//   dogsJuliaCorrected.splice(-2);

//   const dogs = [...dogsJuliaCorrected, ...dogsKate];

//   dogs.forEach((dog, i) => {
//     if (dog >= 3) {
//       console.log(`dog num ${i + 1} is an adult ,and is ${dog} years old`);
//     } else {
//       console.log(`dog num ${i + 1} is still puppy  `);
//     }
//   });
// };

// checkDogs(juliaData, kateData);

// // this paradigm is functional programing
// const movUsd = movements.map(mov => Math.floor(mov * eurToUsd));
// console.log(movements);
// console.log(movUsd);

const createUsername = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsername(accounts);
console.log(accounts);

const eurToUsd = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD.toFixed());

// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

// return the maximum value in the movements array
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);

// console.log(max);

// const isPalindrome = function (str) {
//   return str === str.split('').reverse().join('');
// };

// ** challenge 2 **
// const Data1 = [3, 5, 2, 12, 7];
// const Data2 = [4, 1, 15, 8, 3];

// const calcAverageHumanAge = function (ages) {
//   const humanAge = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 2));
//   const adult = humanAge.filter(age => age >= 18);
//   const avg = adult.reduce((acc, cur, _, arr) => acc + cur / arr.length, 0);
//   return console.log(avg);
// };
// calcAverageHumanAge(Data1);
// calcAverageHumanAge(Data2);

// const fristWithdrawal = movements.find(mov => mov < 0);
// console.log(fristWithdrawal);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

let curAcc;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  curAcc = accounts.find(acc => acc.username === inputLoginUsername.value);
  if (curAcc?.pin === Number(inputLoginPin.value)) {
    console.log('log');
    labelWelcome.textContent = `welcome back ${curAcc.owner.split(' ')[0]}`;
    containerApp.style.opacity = 1;
    inputLoginUsername.value = inputLoginPin.value = '';

    inputLoginPin.blur();

    updateUI(curAcc);
  }
  console.log(curAcc);
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const reciverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  console.log(amount, reciverAcc);
  if (
    amount > 0 &&
    reciverAcc &&
    curAcc.balance >= amount &&
    reciverAcc?.username !== curAcc.username
  ) {
    // doing the transfer
    curAcc.movements.push(-amount);
    reciverAcc.movements.push(amount);
    // update the UI
    updateUI(curAcc);
  }
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  if (
    curAcc.username === inputCloseUsername.value &&
    curAcc.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(acc => acc.username === curAcc.username);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

// findLast withdrawal method

const lastWithdrawal = movements.findLast(mov => mov < 0);
console.log(lastWithdrawal);

// findLastIndex method
const latestLargeMovIndex = movements.findLastIndex(mov => mov > 1000);
console.log(latestLargeMovIndex);
console.log(
  `your latest large mov was ${movements.length - latestLargeMovIndex} ago`
);

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && curAcc.movements.some(mov => mov >= amount * 0.1)) {
    // add movement
    curAcc.movements.push(amount);
    // update UI
    updateUI(curAcc);
    inputLoanAmount.value = '';
  }
});

const deposit = mov => mov > 0;

// const accountMov = accounts.map(acc => acc.movements);
// console.log(accountMov.flat());

const accMovements = accounts
  .flatMap(acc => acc.movements)
  .reduce((sum, mov) => sum + mov, 0);
console.log(accMovements);

// Coding Challenge #4

/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/

// const breeds = [
//   {
//     breed: 'German Shepherd',
//     averageWeight: 32,
//     activities: ['fetch', 'swimming'],
//   },
//   {
//     breed: 'Dalmatian',
//     averageWeight: 24,
//     activities: ['running', 'fetch', 'agility'],
//   },
//   {
//     breed: 'Labrador',
//     averageWeight: 28,
//     activities: ['swimming', 'fetch'],
//   },
//   {
//     breed: 'Beagle',
//     averageWeight: 12,
//     activities: ['digging', 'fetch'],
//   },
//   {
//     breed: 'Husky',
//     averageWeight: 26,
//     activities: ['running', 'agility', 'swimming'],
//   },
//   {
//     breed: 'Bulldog',
//     averageWeight: 36,
//     activities: ['sleeping'],
//   },
//   {
//     breed: 'Poodle',
//     averageWeight: 18,
//     activities: ['agility', 'fetch'],
//   },
// ];

// const huskyWeight = breeds.find(breed => breed.breed === 'Husky').averageWeight;
// console.log(huskyWeight);

// const dogBothActivities = breeds.find(
//   breed =>
//     breed.activities.includes('running') && breed.activities.includes('fetch')
// ).breed;

// console.log(dogBothActivities);

// const allActivities = breeds.flatMap(breed => breed.activities);
// console.log(allActivities);

// const uniqueActivities = [...new Set(allActivities)];
// console.log(uniqueActivities);

// const swimmingAdjacent = breeds
//   .filter(breed => breed.activities.includes('swimming'))
//   .flatMap(breed => breed.activities)
//   .filter(activity => activity !== 'swimming');

// console.log([...new Set(swimmingAdjacent)]);

// console.log(breeds.every(breed => breed.averageWeight > 10));
// console.log(breeds.some(breed => breed.activities.length >= 3));

// const fetchWeights = breeds
//   .filter(breed => breed.activities.includes('fetch'))
//   .map(breed => breed.averageWeight);
// const heaviestFetchBreed = Math.max(...fetchWeights);
// console.log(fetchWeights);
// console.log(heaviestFetchBreed);

let sorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovements(curAcc.movements, !sorted);
  sorted = !sorted;
});

