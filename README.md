# jCody

[Snake Demo]

[Snake Demo]:[codhah92.github.io/jCody]

## Background

jCody is a lightweight JavaScript library that facilitates DOM manipulation. Inspired by jQuery, jCody simplifies HTML document traversing, event handling, and AJAX requests in JavaScript.

# Guidelines

## Installation

To use jCody, start by downloading `./jCody/lib` and include it in your project directory. Then, include the following script tag in the `head` section of your HTML document:

``` javascript
  <script src="./jCody/lib/main.js" charset="utf-8"></script>
```

You can also include the following code snippet at the top of every file that uses jCody.

``` javascript
  const $c = require('./../jCody/lib/main.js');
```

## Sample Usage

With jCody, you can perform some basic DOM manipulation functions:

You can select specific HTML elements or selectors...

``` javascript
$l('ul')
// select all ul elements

$l('.hello')
// select 'hello' class
```

You can alter the innerHTML of selected elements...

``` javascript
$l('li').html('cool')
// select li elements and change innerHTML to 'cool'
```

You can implement event handlers...

``` javascript
$l('.button').on('click', () => {
  console.log('Clicking the button class');
})
// clicking the button class will render 'Clicking the button class' to the console
```

You can perform an AJAX request...

``` javascript
$l.ajax({
  method: "GET",
  url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
  success(data) {
    console.log("We have your weather!")
    console.log(data);
  },
  error() {
    console.error("An error occurred.");
  }
})
// will fetch weather information
```

### `DOMNodeCollection.prototype` Methods

#### `html`
* Takes a string as an optional argument
* Given no argument, it returns the `innerHTML` of the first node of the collection
* Given a string as an argument, the string is set as the `innerHTML` of each node in the collection

#### `empty`
* Clears all nodes in the node collection

#### `append`
* Takes a a string, an HTML element, or a jCody wrapped node collection
* Appends the `outerHTML` of the given argument to the `innerHTML` of each element in the node collection

#### `attr`
* Takes an attribute parameter along with an optional value parameter (attribute, value)
* Given just an attribute parameter, it returns the first element in the node collection that matches the attribute
* Given both an attribute and value parameter, it sets the matched attribute to the value parameter for each node in the collection

#### `addClass`
* Takes multiple classes as arguments and adds each to the class list of each node in the node collection

#### `removeClass`
* Takes multiple classes as arguments and removes each from the class list of each node in the node collection

#### `children`
* Returns collection of all children of each node

#### `parent`
* Returns collection of all parent nodes

#### `find`
* Takes a selector as an argument and returns all descendants of each node in the set of matched nodes.

#### `remove`
* Removes all instances of each node from the DOM

#### `on`
* Takes an event and callback as arguments and adds an eventListener for each element in the collection
* Activates callback action when triggered  

#### `off`
* Takes an event as an argument and removes all eventListeners for each element in the collection
