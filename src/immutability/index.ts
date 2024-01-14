let person = {
  firstName: "Bob",
  lastName: "Loblaw",
  address: {
    street: "123 Fake St",
    city: "Emberton",
    state: "NJ"
  }
}

type Person = typeof person;

function giveAwesomePowers(person: Person & {
  specialPower?: string
}) {
  person.specialPower = "invisibility";
  return person;
}

const jack = giveAwesomePowers(person)
console.log('Are they the same?', person === jack);

// This creates a variable, `crayon`, that points to a box (unnamed),
// which holds the object `{ color: 'red' }`
let crayon = { color: 'red' };

// Changing a property of `crayon` does NOT change the box it points to
crayon.color = 'blue';

// Assigning an object or array to another variable merely points
// that new variable at the old variable's box in memory
let crayon2 = crayon;
console.log(crayon2 === crayon); // true. both point to the same box.

// Niw, any further changes to `crayon2` will also affect `crayon1`
crayon2.color = 'green';
console.log(crayon.color); // changed to green!
console.log(crayon2.color); // also green!

// ...because these two variables refer to the same object in memory
console.log(crayon2 === crayon);
