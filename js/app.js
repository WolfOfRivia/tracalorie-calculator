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
    this._displayCaloriesProgress();
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
    const progressEl = document.getElementById('calorie-progress');
    caloriesRemainingEl.innerHTML = remaining;
    if(remaining <= 0) {
      caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-light');
      caloriesRemainingEl.parentElement.parentElement.classList.add('bg-danger');
      progressEl.classList.remove('bg-success');
      progressEl.classList.add('bg-danger');
    } else {
      caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-danger');
      caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
      progressEl.classList.remove('bg-danger');
      progressEl.classList.add('bg-success');
    }
  }

  // Progress Bar
  _displayCaloriesProgress() {
    const progressEl = document.getElementById('calorie-progress');
    const percentage = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(percentage, 100);
    progressEl.style.width = `${width}%`;
  }

  // Create a render to update the UI after a change has been made
  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
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

class App {
  constructor() {
    this._tracker = new CalorieTracker();
    document.getElementById('meal-form').addEventListener('submit', this._newMeal.bind(this));
    document.getElementById('workout-form').addEventListener('submit', this._newWorkout.bind(this));  
  }

  _newMeal(e) {
    e.preventDefault();
    const name = document.getElementById('meal-name');
    const calories = document.getElementById('meal-calories');

    // Validate Inputs
    if(name.value === '' || calories.value === '') {
      alert('Please fill in all fields');
      return;
    }

    // Create new meal
    const meal = new Meal(name.value, +calories.value); // +calories.value is just another way of converting from a string to a number
    // Call the add meal method from the tracker class and add the new meal
    this._tracker.addMeal(meal);

    // Clear Forms
    name.value = '';
    calories.value = '';

    // Close meal form
    const collapseMeal = document.getElementById('collapse-meal');
    const bsCollapse = new bootstrap.Collapse(collapseMeal, {
      toggle: true
    })
    // console.log(this);
  }

  _newWorkout(e) {
    e.preventDefault();
    const name = document.getElementById('workout-name');
    const calories = document.getElementById('workout-calories');

    // Validate Inputs
    if(name.value === '' || calories.value === '') {
      alert('Please fill in all fields');
      return;
    }

    // Create new meal
    const workout = new Workout(name.value, +calories.value);
    // Call the add workout method from the tracker class and add the new workout
    this._tracker.addWorkout(workout);

    // Clear Forms
    name.value = '';
    calories.value = '';

    // Close workout form
    const collapseWorkout = document.getElementById('collapse-workout');
    const bsCollapse = new bootstrap.Collapse(collapseWorkout, {
      toggle: true
    })

    // console.log(this);
  }
}

// Initialize App
const app = new App();