// What is the output?

console.log(1);
setTimeout(function() {
  console.log(2);
}, 1000);
setTimeout(function() {
  console.log(3);
}, 0);
console.log(4);


// What is the output?

function say(a) {
  alert(a);
}
say(1);
setTimeout(say(2), 5000);
setTimeout(function() {
  say(3);
}, 1000);
setTimeout(say, 2000, 4);


// What's wrong? How fix?

var done = false;
$.ajax(url, function() {
  done = true;
});
while (!done) {
  someWaitingStuff();
}


var a = function(i) {
    console.log(i);
  };
  var b = function(i) {
    console.log(i);
  };
  for (var i = 0; i < 5; i++) {
    a(i);
  }
  for (var i = 4; i >= 0; i--) {
    b(i);
  }



var list = readHugeList();
var nextListItem = function() {
  var item = list.pop();
  if (item) {
    // process the list item...
    nextListItem();
  }
};



// What is the output

(function() {
  console.log(1);
  setTimeout(() => console.log(2), 1000);
  setTimeout(() => console.log(3), 0);
  Promise.resolve(true).then(() => console.log(4));
  console.log(5);
})();


// What is the output

try {
  setTimeout(function() {
    throw new Error();
  }, 1000);
} catch (e) {
  alert( e);
}