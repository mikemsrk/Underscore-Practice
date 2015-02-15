/*
each_.each(list, iteratee, [context]) Alias: forEach 
Iterates over a list of elements, yielding each in turn to an iteratee function. 
The iteratee is bound to the context object, if one is passed. 
Each invocation of iteratee is called with three arguments: (element, index, list). 
If list is a JavaScript object, iteratee's arguments will be (value, key, list). Returns the list for chaining.

_.each([1, 2, 3], alert);
=> alerts each number in turn...
_.each({one: 1, two: 2, three: 3}, alert);
=> alerts each number value in turn...
*/

var each = function(list, iteratee){

	if(Array.isArray(list)){
		for(var i = 0; i < list.length; i++){
			iteratee(list[i]);
		}
	}else if(typeof list === 'object'){
		for(var item in list){
			iteratee(list[item]);
		}
	}
}

//each([1,2,3],console.log);
//each({one:1,two:2,three:3},console.log);

/*
map_.map(list, iteratee, [context]) Alias: collect 
Produces a new array of values by mapping each value in list through a transformation function (iteratee). If list is a JavaScript object, iteratee's arguments will be (value, key, list).

_.map([1, 2, 3], function(num){ return num * 3; });
=> [3, 6, 9]
_.map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; });
=> [3, 6, 9]
*/

var map = function(list,iteratee){
	var result;

	if(Array.isArray(list)){
		result = [];
		list.forEach(function(item){
			result.push(iteratee(item));
		});
		return result;
	}else if(typeof list === 'object'){
		for(var item in list){
			list[item] = iteratee(list[item]);
		}
		return list;
	}
}

//console.log(map([1, 2, 3], function(num){ return num * 3; }));
//console.log(map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; }));

/*
reduce_.reduce(list, iteratee, [memo], [context]) Aliases: inject, foldl 
Also known as inject and foldl, reduce boils down a list of values into a single value. 
Memo is the initial state of the reduction, and each successive step of it should be returned by iteratee. 
The iteratee is passed four arguments: the memo, then the value and index (or key) of the iteration, 
and finally a reference to the entire list.

If no memo is passed to the initial invocation of reduce, the iteratee is not invoked on the first element of the list. The first element is instead passed as the memo in the invocation of the iteratee on the next element in the list.

var sum = _.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0);
=> 6
*/

var reduce = function(list,iteratee,start){
	if(start === undefined){
		start = list.unshift();
	}
	each(list,function(item){
		start = iteratee(start,item);
	});

	return start;

}

//console.log(reduce([1,2,3], function(memo,num){return memo + num; }, 0));
//var listO = {a:1,b:2,c:3};
//console.log(reduce(listO,function(memo,num){return memo + num; }, 0));

/*
reduceRight_.reduceRight(list, iteratee, memo, [context]) Alias: foldr 
The right-associative version of reduce. Delegates to the JavaScript 1.8 version of reduceRight, if it exists. Foldr is not as useful in JavaScript as it would be in a language with lazy evaluation.

var list = [[0, 1], [2, 3], [4, 5]];
var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
=> [4, 5, 2, 3, 0, 1]
*/


var reduceRight = function(list,iteratee,start){

	if(Array.isArray(list)){
		//do array things
		if(start === undefined){
		start = list.pop();
		}
		for(var i=list.length-1;i>=0;i--){
			start = iteratee(start,list[i]);
		}
	}else if(typeof list === 'object'){
		//do object things
		var temp = [];
		for(var item in list){
			temp.push(list[item]);
		}
		for(var i=temp.length-1;i>=0;i--){
			start = iteratee(start,temp[i]);
		}
	}


	return start;
}

//var list = [[0, 1], [2, 3], [4, 5]];
//console.log(reduceRight(list, function(a, b) { return a.concat(b); }, []));
//var listO = {a:[0,1],b:[2,3],c:[4,5]};
//console.log(reduceRight(listO, function(a, b) { return a.concat(b); }, []));

/*
find_.find(list, predicate, [context]) Alias: detect 
Looks through each value in the list, returning the first one that passes a truth test (predicate), or undefined if no value passes the test. The function returns as soon as it finds an acceptable element, and doesn't traverse the entire list.

var even = _.find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
=> 2
*/

var find = function(list,predicate){
	
/*	each(list,function(val){
		if(predicate(val)) return val; // this doesn't work with each, but works when iterating with a for loop
	});*/

	if(Array.isArray(list)){
		//do for loop and return first value that passes predicate
		for(var i=0; i<list.length;i++){
			if(predicate(list[i])) return list[i];
		}
	}else if(typeof list === 'object'){
		// do for loop and return first value that passes predicate
		for(var i in list){
			if(predicate(list[i])) return list[i];
		}
	}

	return undefined;
}

//console.log(find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }));
//console.log(find({a:1,b:2,c:3,d:4,e:5,f:6},function(num){return num % 2 == 0;}));

/*	filter_.filter(list, predicate, [context]) Alias: select 
Looks through each value in the list, returning an array of all the values that pass a truth test (predicate).

var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
=> [2, 4, 6]*/

var filter = function(list,predicate){
	var result = [];

	each(list,function(num){
		if(predicate(num)) result.push(num);
	});

	return result;
}

//console.log(filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }));
//console.log(filter({a:1,b:2,c:3,d:4,e:5,f:6}, function(num){ return num % 2 == 0; }));

/*	where_.where(list, properties) 
Looks through each value in the list, returning an array of all the values that contain all of the key-value pairs listed in properties.

_.where(listOfPlays, {author: "Shakespeare", year: 1611});
=> [{title: "Cymbeline", author: "Shakespeare", year: 1611},
    {title: "The Tempest", author: "Shakespeare", year: 1611}]*/

var where = function(list,properties){
	var result = [];

	// loop through each value in list
	each(list,function(val){
		var match = 0;
		//loop through each key in properties, compare against list properties
		for(var i in properties){
			if(properties[i] === val[i]) match++;
		}
		//if number of matches = length of properties, then pass it to result array.
		if(match === Object.keys(properties).length) result.push(val);
	});

	return result;

}

//var listOfPlays = [{title: "Cymbeline", author: "Shakespeare", year: 1611},{title: "The Tempest", author: "Shakespeare", year: 1611},{title: "The Tempest", author: "Shakespeare", year: 1644}];
//console.log(where(listOfPlays, {author: "Shakespeare", year: 1611}));

/*	findWhere_.findWhere(list, properties) 
Looks through the list and returns the first value that matches all of the key-value pairs listed in properties.

If no match is found, or if list is empty, undefined will be returned.

_.findWhere(publicServicePulitzers, {newsroom: "The New York Times"});
=> {year: 1918, newsroom: "The New York Times",
  reason: "For its public service in publishing in full so many official reports,
  documents and speeches by European statesmen relating to the progress and
  conduct of the war."}*/

  var findWhere = function(list,properties){
  	//same as find, but only return the first object
  	
  	for(var i=0;i<list.length;i++){
  		var val = list[i];
  		var match = 0;
  		for(var i in properties){
  			if(properties[i] === val[i]) match++;
  		}
  		if(match === Object.keys(properties).length) return val;
  		}
	}

//var listOfPlays = [{title: "Cymbeline", author: "Shakespeare", year: 1611},{title: "The Tempest", author: "Shakespeare", year: 1611},{title: "The Tempest", author: "Shakespeare", year: 1644}];
//console.log(findWhere(listOfPlays, {author: "Shakespeare", year: 1611}));


/*reject_.reject(list, predicate, [context]) 
Returns the values in list without the elements that the truth test (predicate) passes. The opposite of filter.

var odds = _.reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
=> [1, 3, 5]*/

//opposite of filter
var reject = function(list,predicate){
	var result = [];

	each(list,function(val){
		if(!predicate(val)){
			result.push(val);
		}
	});
	return result;
}

//console.log(reject([1,2,3,4,5,6],function(num) {return num % 2 == 0;}));


/*	every_.every(list, [predicate], [context]) Alias: all 
Returns true if all of the values in the list pass the predicate truth test.

_.every([true, 1, null, 'yes'], _.identity);
=> false */

var every = function(list,predicate){
	this.result = true;

	each(list,function(value){
		if(!predicate(value)) this.result = false;
	});
	return this.result;
}

//console.log(every([1,2,3,4,5],function(num){ return num < 5;}));

/*	some_.some(list, [predicate], [context]) Alias: any 
Returns true if any of the values in the list pass the predicate truth test. Short-circuits and stops traversing the list if a true element is found.

_.some([null, 0, 'yes', false]);
=> true*/

var some = function(list,predicate){
	if(predicate === undefined){
		predicate = function(val){return val;};
	}

	if(Array.isArray(list)){
		for(var i=0;i<list.length;i++){
			if(predicate(list[i])) return true;
		}
	}else if(typeof list === 'object'){
		for(var i in list){
			if(predicate(list[i])) return true;
		}

	}
	return false;
}

//console.log(some([null,0,'yes',false]));

/*	contains_.contains(list, value) Alias: include 
Returns true if the value is present in the list. Uses indexOf internally, if list is an Array.

_.contains([1, 2, 3], 3);
=> true*/

var contains = function(list,value){
	if(Array.isArray(list)){
		if(list.indexOf(value) !== -1) return true;
	}else if(typeof list === 'object'){
		for(var i in list){
			if(list[i] === value) return true;
		}
	}
	return false;
}

//console.log(contains([1,2,3],4));
//console.log(contains({a:1,b:2,c:3},4));

/*	invoke_.invoke(list, methodName, *arguments) 
Calls the method named by methodName on each value in the list. Any extra arguments passed to invoke will be forwarded on to the method invocation.

_.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
=> [[1, 5, 7], [1, 2, 3]]*/

var invoke = function(list,methodName){



}

/*	pluck_.pluck(list, propertyName) 
A convenient version of what is perhaps the most common use-case for map: extracting a list of property values.

var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
_.pluck(stooges, 'name');
=> ["moe", "larry", "curly"]*/

var pluck = function(list,propertyName){
	var result = [];

	for(var i in list){
		result.push(list[i][propertyName]);
	}

	return result;

}
//var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
//console.log(pluck(stooges,'name'));

/*	max_.max(list, [iteratee], [context]) 
Returns the maximum value in list. If an iteratee function is provided, it will be used on each value to generate the criterion by which the value is ranked. -Infinity is returned if list is empty, so an isEmpty guard may be required.

var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
_.max(stooges, function(stooge){ return stooge.age; });
=> {name: 'curly', age: 60};*/

var max = function(list,iteratee){
	var that = this.result;
	var result = 0;

	each(list,function(val){
		if(iteratee(val) > result) {
			that = val;
			result = iteratee(val);
		}
	});

	return that;
}

//var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
//console.log(max(stooges, function(stooge){ return stooge.age; }));

/*	min_.min(list, [iteratee], [context]) 
Returns the minimum value in list. If an iteratee function is provided, it will be used on each value to generate the criterion by which the value is ranked. Infinity is returned if list is empty, so an isEmpty guard may be required.

var numbers = [10, 5, 100, 2, 1000];
_.min(numbers);
=> 2*/

var min = function(list,iteratee){

if(iteratee === undefined) iteratee = function(val){return val;};
var result;
var that = this.result;

	each(list,function(val){
		if(result === undefined){result = val;}
		if(iteratee(val) < result) {
			result = iteratee(val);
			that = val;
		}
	});

	return that;

}
//var numbers = [10, 5, 100, 2, 1000];
//console.log(min(numbers));

/*	sortBy_.sortBy(list, iteratee, [context]) 
Returns a (stably) sorted copy of list, ranked in ascending order by the results of running each value through iteratee. iteratee may also be the string name of the property to sort by (eg. length).

_.sortBy([1, 2, 3, 4, 5, 6], function(num){ return Math.sin(num); });
=> [5, 4, 6, 3, 1, 2]*/

var sortBy = function(list,iteratee){
	if(iteratee === undefined){
		iteratee = function(val){return val;};
	}

	var sorted = false;
	if(!Array.isArray(list) && typeof list === 'object'){
		var tempArr = [];
		for(var i in list){
			tempArr.push(list[i]);
		}
		list = tempArr;
	}

	while(!sorted){
		sorted = true;

		for(var i=0;i<list.length-1;i++){
			if(iteratee(list[i]) > iteratee(list[i+1])){
				sorted = false;
				var temp = list[i];
				list[i] = list[i+1];
				list[i+1] = temp;
			}
		}
	}
	return list;
}

//console.log(sortBy([1,2,3,4,5,6],function(num){ return Math.sin(num);}));
//console.log(sortBy({a:1,b:2,c:3,d:4,e:5,f:6},function(num){return Math.sin(num);}));

/*	groupBy_.groupBy(list, iteratee, [context]) 
Splits a collection into sets, grouped by the result of running each value through iteratee. If iteratee is a string instead of a function, groups by the property named by iteratee on each of the values.

_.groupBy([1.3, 2.1, 2.4], function(num){ return Math.floor(num); });
=> {1: [1.3], 2: [2.1, 2.4]}

_.groupBy(['one', 'two', 'three'], 'length');
=> {3: ["one", "two"], 5: ["three"]}*/

var groupBy = function(list,iteratee){

	var that = {};

	// run the iteratee with each item of the list
	// check if the iteratee result is a key in results object
	// if it already is a key, push original item onto the key
	// if it is not, set it as key and push original item onto key
	each(list,function(val){
		if(iteratee(val) in that){
			that[iteratee(val)].push(val);
		}else{
			that[iteratee(val)] = [val];
		}
	});
	return that;
}

//console.log(groupBy([1.3,2.1,2.4],function(num){return Math.floor(num);}));
//console.log(groupBy(['one','two','three'],function(val){return val.length;}));

/*	indexBy_.indexBy(list, iteratee, [context]) 
Given a list, and an iteratee function that returns a key for each element in the list (or a property name), returns an object with an index of each item. Just like groupBy, but for when you know your keys are unique.

var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
_.indexBy(stooges, 'age');
=> {
  "40": {name: 'moe', age: 40},
  "50": {name: 'larry', age: 50},
  "60": {name: 'curly', age: 60}
}*/

var indexBy = function(list,iteratee){

	var result = {};
	var presort = [];

	each(list,function(val){
		presort.push(val[iteratee]);
	});

	var sorted = sortBy(presort);

	each(list,function(obj){
		each(sorted,function(key){
			if(key === obj[iteratee]) result[key] = obj;
		});
	});

	return result;
}

//var stooges = [{name: 'moe', age: 60}, {name: 'larry', age: 50}, {name: 'curly', age: 40}];
//console.log(indexBy(stooges, 'age'));

/*	countBy_.countBy(list, iteratee, [context]) 
Sorts a list into groups and returns a count for the number of objects in each group. Similar to groupBy, but instead of returning a list of values, returns a count for the number of values in that group.

_.countBy([1, 2, 3, 4, 5], function(num) {
  return num % 2 == 0 ? 'even': 'odd';
});
=> {odd: 3, even: 2}*/

var countBy = function(list,iteratee){

	var result = {};

	//group the list into groups based on iteratee
	each(list,function(val){
		if(iteratee(val) in result){
			result[iteratee(val)]++;
		}else{
			result[iteratee(val)] = 1;
		}
	});
	return result;
}

//console.log(countBy([1,2,3,4,5],function(num){return num%2 === 0 ? 'even': 'odd';}));

/*	shuffle_.shuffle(list) 
Returns a shuffled copy of the list, using a version of the Fisher-Yates shuffle.

_.shuffle([1, 2, 3, 4, 5, 6]);
=> [4, 1, 6, 3, 5, 2]*/

var shuffle = function(list){

	for(var i=0;i<list.length;i++){
		var j = Math.floor(Math.random()*list.length);
		var current = list[i];
		list[i] = list[j];
		list[j] = current;
	}
	return list;
}

//console.log(shuffle([1,2,3,4,5,6]));

/*
sample_.sample(list, [n]) 
Produce a random sample from the list. Pass a number to return n random elements from the list. Otherwise a single random item will be returned.

_.sample([1, 2, 3, 4, 5, 6]);
=> 4

_.sample([1, 2, 3, 4, 5, 6], 3);
=> [1, 6, 2]*/
var sample = function(list,n){
	if(n === undefined) n = 1;

	shuffle(list);
	list = list.slice(0,n);
	return list;
}

console.log(sample([1,2,3,4,5,6],4));

