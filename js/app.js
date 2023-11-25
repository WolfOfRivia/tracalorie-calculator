class CalorieTracker {
  // create calorie constructor
  constructor() {
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
  }

  // add meal and add to calories
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
  }

  // add workout and burn(remove) calories
  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
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

const run = new Workout('Morning Run', 300);
tracker.addWorkout(run);

console.log(tracker._meals);
console.log(tracker._workouts);
console.log(tracker._totalCalories);

