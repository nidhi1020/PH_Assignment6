1) What is the difference between var, let, and const?

var---
i.function scope
ii.allow re-assign
iii.can redeclare within the same scope
iv.use->legacy code.

let---
i.block scope
ii.allow re-assign
iii.can not redeclare within the same scope
iv.use->when value change later

const---
i.block scope
ii.does not allow re-assign
iii.can not redeclare within the same scope
iv.when the value never change after assigned


2) What is the difference between map(), forEach(), and filter()?

map()-
returns-A new arr with transformed values
Transfomrs element into new arr

forEach()-
returns-undefined
execute a function for each item

filter()-
returns-a new arr with matching values
selects items based on condition


3) What are arrow functions in ES6?

arrow function syntax-
const add=(a,b)=>a+b;


4) How does destructuring assignment work in ES6?

allows unpack values from arrays and objects into variable
example-
const[x,y]=[10,20];
const {name,age}=person;

5) Explain template literals in ES6. How are they different from string concatenation?

templete literals use `` and allow
i.multiline string 
ii.${}

example-

const name='ariya'
const roll=10

console.log(`my name is ${name} and my roll is ${roll}`)