class CalorieTracker {
  // create calorie constructor
  constructor() {
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    this._displayCalorieLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
  }

  // PUBLIC METHODS/API
  // add meal and add to calories
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._render();
  }

  // add workout and burn(remove) calories
  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._render();
  }

  // PRIVATE METHODS
  // Display total Calories
  _displayCaloriesTotal() {
    const totalCaloriesEl = document.getElementById('calories-total');
    totalCaloriesEl.innerHTML = this._totalCalories;
  }

  // Display Calorie Limit
  _displayCalorieLimit() {
    const calorieLimitEl = document.getElementById('calories-limit');
    calorieLimitEl.innerHTML = this._calorieLimit;
  }

  // Display Calories Consumed
  _displayCaloriesConsumed() {
    const caloriesConsumedEl = document.getElementById('calories-consumed');
    const consumed = this._meals.reduce((total, meal) => total + meal.calories, 0);
    caloriesConsumedEl.innerHTML = consumed;
  }

  // Display Calories Burned
  _displayCaloriesBurned() {
    const caloriesBurnedEl = document.getElementById('calories-burned');
    const burned = this._workouts.reduce((total, workout) => total + workout.calories, 0);
    caloriesBurnedEl.innerHTML = burned;
  }

   // Display Calories Remaining
  _displayCaloriesRemaining() {
    const caloriesRemainingEl = document.getElementById('calories-remaining');
    const remaining = this._calorieLimit - this._totalCalories;
    caloriesRemainingEl.innerHTML = remaining;
  }

  // Create a render to update the UI after a change has been made
  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    // this._displayCalorieLimit();
  }
}

// Meal Constructor
class Meal {
  constructor(name, calories) {
    // If on a server, the servers create ids for you but since this is a full front end project we have to create the ids
    // This is one way of doing so.
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

// Workout Constructor
class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

// Initialize Tracker
const tracker = new CalorieTracker();

// Testing to see if everything works
const breakfast = new Meal('Breakfast', 400);
tracker.addMeal(breakfast);

const lunch = new Meal('lunch', 350);
tracker.addMeal(lunch);

const run = new Workout('Morning Run', 300);
tracker.addWorkout(run);

const lift = new Workout('Dead Lift', 320);
tracker.addWorkout(lift);

console.log(tracker._meals);
console.log(tracker._workouts);
console.log(tracker._totalCalories);

