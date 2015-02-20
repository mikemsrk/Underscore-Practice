// Section 1 - Collections
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

//console.log(sample([1,2,3,4,5,6],4));

/*	toArray_.toArray(list) 
Creates a real Array from the list (anything that can be iterated over). Useful for transmuting the arguments object.

(function(){ return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
=> [2, 3, 4]*/

var toArray = function(list){
	var result = [];

	if(Array.isArray(list)){
		return list;
	}
	else if(typeof list === 'string'){
		for(var i=0;i<list.length;i++){
			result.push(list.charAt(i));
		}
	}else if(typeof list === 'object'){
		for(var i in list){
			result.push([i,list[i]]);
		}
	}

	return result;

}

//console.log(toArray({a:1,b:2,c:3,d:4}));

/*	size_.size(list) 
Return the number of values in the list.

_.size({one: 1, two: 2, three: 3});
=> 3*/

var size = function(list){
	var result = 0;

	each(list,function(val){
		result++;
	});

	return result;
}

//console.log(size({one:1,two:2,three:3}));

/*	partition_.partition(array, predicate) 
Split array into two arrays: one whose elements all satisfy predicate and one whose elements all do not satisfy predicate.

_.partition([0, 1, 2, 3, 4, 5], isOdd);
=> [[1, 3, 5], [0, 2, 4]]*/

var partition = function(array,predicate){
	var result = [];
	var counter = [];

	each(array,function(val){
		if(predicate(val)) {result.push(val);}
		else {counter.push(val);}
	});

	return [result,counter];

}
//console.log(partition([0,1,2,3,4],function(val){return val % 2 !== 0;}));

// Section 2 - Arrays

/*	first_.first(array, [n]) Alias: head, take 
Returns the first element of an array. Passing n will return the first n elements of the array.

_.first([5, 4, 3, 2, 1]);
=> 5*/
var first = function(array,n){
	if(n === undefined){
		return array[0];
	}else{
		return array.slice(0,n);
	}
}

//console.log(first([5,4,3,2,1]));

/*	initial_.initial(array, [n]) 
Returns everything but the last entry of the array. Especially useful on the arguments object. Pass n to exclude the last n elements from the result.

_.initial([5, 4, 3, 2, 1]);
=> [5, 4, 3, 2]*/

var initial = function(array, n){
	if(n === undefined){return array.slice(0,-1);}
	else{
		return array.slice(0,-n);
	}
}

//console.log(initial([5,4,3,2,1],2));

/*	last_.last(array, [n]) 
Returns the last element of an array. Passing n will return the last n elements of the array.

_.last([5, 4, 3, 2, 1]);
=> 1*/

var last = function(array,n){
	if(n === undefined){return array[array.length-1];}
	else{return array.slice(-n)}
}

//console.log(last([5,4,3,2,1],1));

// rest_.rest(array, [index]) Alias: tail, drop 
// Returns the rest of the elements in an array. Pass an index to return the values of the array from that index onward.

// _.rest([5, 4, 3, 2, 1]);
// => [4, 3, 2, 1]

var rest = function(array,index){
	if(index === undefined) return array.slice(1);
	else return array.slice(index);
}

//console.log(rest([5,4,3,2,1]));

// compact_.compact(array) 
// Returns a copy of the array with all falsy values removed. In JavaScript, false, null, 0, "", undefined and NaN are all falsy.

// _.compact([0, 1, false, 2, '', 3]);
// => [1, 2, 3]

var compact = function(array){
	var result = [];
	array.forEach(function(val){
		if(val) result.push(val);
	});
	return result;
}

//console.log(compact([0,1,false,2,'',3]));

// flatten_.flatten(array, [shallow]) 
// Flattens a nested array (the nesting can be to any depth). If you pass shallow, the array will only be flattened a single level.

// _.flatten([1, [2], [3, [[4]]]]);
// => [1, 2, 3, 4];

// _.flatten([1, [2], [3, [[4]]]], true);
// => [1, 2, 3, [[4]]];

var flatten = function(array,shallow){
	this.result = [];
	var result = this.result;

	function deepFind(arr){
		if(arr.length === 0) return;
		else{
			arr.forEach(function(val){
				if(Array.isArray(val)) {
					if(shallow){
						val.forEach(function(sval){
							result.push(sval);
						});
					}else{
						deepFind(val);
					}
				}
				else result.push(val);
			});
		}
	}

	deepFind(array);
	return result;

}

//console.log(flatten([5,4,[[3]],2,[[[2],4],1]]));

// without_.without(array, *values) 
// Returns a copy of the array with all instances of the values removed.

// _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
// => [2, 3, 4]

var without = function(array){
	var result = array.slice();

	for(var i=1;i<arguments.length;i++){
		var current = arguments[i];
		while(result.indexOf(current) !== -1){
			var position = result.indexOf(current);
			result.splice(position,1);
		}
	}

	return result;
}

//console.log(without([1,2,1,0,3,1,4],0,1,3));


// union_.union(*arrays) 
// Computes the union of the passed-in arrays: the list of unique items, in order, that are present in one or more of the arrays.

// _.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);
// => [1, 2, 3, 101, 10]

var union = function(arrays){
	var result = [];

	for(var i=0;i<arguments.length;i++){
		var cArray = arguments[i];

		each(cArray,function(val){
			if(!contains(result,val)) result.push(val);
		});

	}
	return result;
}

//console.log(union([1,2,3],[101,2,1,10],[2,1]));

// intersection_.intersection(*arrays) 
// Computes the list of values that are the intersection of all the arrays. Each value in the result is present in each of the arrays.

// _.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
// => [1, 2]

var intersection = function(arrays){
	//take the longest array as base
	//take each value in base, see if other arrays contain it,
	//if so, add that value to results
	var base;
	var result = [];
	var maxLength = 0;
	var args = [];

	for(var i=0;i<arguments.length;i++){
		var cur = arguments[i];
		args.push(cur);
		if(cur.length > maxLength){
			base = cur;
			maxLength = cur.length;
		}
	}

	each(base,function(val){
		var hit = 0;
		for(var i=0;i<args.length;i++){
			var cur = args[i];
			if(contains(cur,val)) hit++;
		}
		if(hit === args.length) result.push(val);
	});

	return result;
}

//console.log(intersection([1,2,3],[101,2,1,10],[2,1]));

// difference_.difference(array, *others) 
// Similar to without, but returns the values from array that are not present in the other arrays.

// _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
// => [1, 3, 4]

var difference = function(array){
	this.results = [];
	var result = this.results;
	for(var y=0;y<array.length;y++){
		var val = array[y];

		for(var i=1;i<arguments.length;i++){
			var cur = arguments[i];
			if(!contains(cur,val))result.push(val);
		}
	}
	return result;
}

//console.log(difference([1,2,3,4,5],[5,2,10]));

// uniq_.uniq(array, [isSorted], [iteratee]) Alias: unique 
// Produces a duplicate-free version of the array, using === to test object equality. 
// If you know in advance that the array is sorted, passing true for isSorted will run a much faster algorithm. If you want to compute unique items based on a transformation, pass an iteratee function.

// _.uniq([1, 2, 1, 3, 1, 4]);
// => [1, 2, 3, 4]

var uniq = function(array){
	var result = [];

	for(var i=0;i<array.length;i++){
		var cur = array[i];
		if(!contains(result,cur)) result.push(cur);
	}

return result;
}

//console.log(uniq([1,2,1,3,1,4]));

// zip_.zip(*arrays) 
// Merges together the values of each of the arrays with the values at the corresponding position. 
// Useful when you have separate data sources that are coordinated through matching array indexes. 
// If you're working with a matrix of nested arrays, _.zip.apply can transpose the matrix in a similar fashion.

// _.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]);
// => [["moe", 30, true], ["larry", 40, false], ["curly", 50, false]]

// _.zip.apply(_, arrayOfRowsOfData);
// => arrayOfColumnsOfData

var zip = function(){

var minArgs; // smallest array length
var sArray; //smallest array
var args = [];
var result = [];

for(var i=0;i<arguments.length;i++){
	var cur = arguments[i];
	args.push(cur);

	if(minArgs === undefined) minArgs = cur.length;
	if(cur.length <= minArgs){
		minArgs = cur.length;
		sArray = cur;
	}
}

for(var i=0;i<sArray.length;i++){
	var temp = [];
	each(args,function(arg){
		temp.push(arg[i]);
	});
	result.push(temp);
}
	return result;

}

//console.log(zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]));


// object_.object(list, [values]) 
// Converts arrays into objects. Pass either a single list of [key, value] pairs, or a list of keys, and a list of values. If duplicate keys exist, the last value wins.

// _.object(['moe', 'larry', 'curly'], [30, 40, 50]);
// => {moe: 30, larry: 40, curly: 50}

// _.object([['moe', 30], ['larry', 40], ['curly', 50]]);
// => {moe: 30, larry: 40, curly: 50}

var object = function(list){
	//if arguments = 1, iterate thru the list and create object
	//if arguments > 1, use 2 lists

	var result = {};

	if(arguments.length === 1){
		//nested arrays
		each(list,function(val){
			result[val[0]] = val[1];
		});
	}else{
		//separated
		for(var i=0;i<arguments[0].length;i++){
			result[arguments[0][i]] = arguments[1][i];
		}
	}
	return result;
}

// console.log(object([['moe', 30], ['larry', 40], ['curly', 50]]));
// console.log(object(['moe', 'larry', 'curly'], [30, 40, 50]));

// indexOf_.indexOf(array, value, [isSorted]) 
// Returns the index at which value can be found in the array, or -1 if value is not present in the array. 
// If you're working with a large array, and you know that the array is already sorted, pass true for isSorted to use a faster binary search ... or, pass a number as the third argument in order to look for the first matching value in the array after the given index.

// _.indexOf([1, 2, 3], 2);
// => 1

var indexOf = function(array,value){

	var index = -1;
	if(arguments.length == 3){} // use faster index? wat 
	for(var i=0;i<array.length;i++){
		if(array[i] === value) index = i;
	}
	return index;
}

//console.log(indexOf([1,2,3],3));


// lastIndexOf_.lastIndexOf(array, value, [fromIndex]) 
// Returns the index of the last occurrence of value in the array, or -1 if value is not present. Pass fromIndex to start your search at a given index.

// _.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
// => 4

var lastIndexOf = function(array,value){
	var index = -1;
	for(var i=array.length-1;i>=0;i--){
		if(array[i] === value) return i;
	}
	return index;
}

//console.log(lastIndexOf([1,2,3,1,2,3],2));

// sortedIndex_.sortedIndex(list, value, [iteratee], [context]) 
// Uses a binary search to determine the index at which the value should be inserted into the list in order to maintain the list's sorted order. 
// If an iteratee function is provided, it will be used to compute the sort ranking of each value, including the value you pass. 
// The iteratee may also be the string name of the property to sort by (eg. length).

// _.sortedIndex([10, 20, 30, 40, 50], 35);
// => 3

// var stooges = [{name: 'moe', age: 40}, {name: 'curly', age: 60}];
// _.sortedIndex(stooges, {name: 'larry', age: 50}, 'age');
// => 1

var sortedIndex = function(list,value,iteratee){

	if(iteratee === undefined) iteratee = function(val){return val;};
	var asc; // true for ascending, false for descending
	var index;

	for(var i=0;i<list.length-1;i++){
		//first determine if the list is ascending or descending order
		var cur = iteratee(list[i]);
		var next = iteratee(list[i+1]); 

		if(cur < next) asc = true;
		else if(next < cur) asc = false;
	}

	//second iterate over the list
	for(var i=0;i<list.length-1;i++){
		var cur = iteratee(list[i]);
		var next = iteratee(list[i+1]);
		var test = iteratee(value);

		if(asc){ //ascending
			if(test >= cur && test < next) return i+1;
			else if(test < cur) return 0;
			else if(test >= next) index = list.length;
		}else{
			if(test <= cur && test > next) return i+1;
			else if(test > cur) return 0;
			else if(test <= next) index = list.length;
		}
	}
	return index;
}

//console.log(sortedIndex([10,35,35,40,50],35));
//console.log(sortedIndex([50,40,30,20,10],35));

//var stooges = [{name: 'moe', age: 40}, {name: 'curly', age: 50}, {name: 'brad', age: 60}];
//console.log(sortedIndex(stooges,{name:'larry',age:45},function(val){return val.age;}));

// range_.range([start], stop, [step]) 
// A function to create flexibly-numbered lists of integers, handy for each and map loops. start, if omitted, defaults to 0; step defaults to 1. Returns a list of integers from start to stop, incremented (or decremented) by step, exclusive. Note that ranges that stop before they start are considered to be zero-length instead of negative — if you'd like a negative range, use a negative step.

// _.range(10);
// => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
// _.range(1, 11);
// => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// _.range(0, 30, 5);
// => [0, 5, 10, 15, 20, 25]
// _.range(0, -10, -1);
// => [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
// _.range(0);
// => []

var range = function(start,stop,step){
	var result = [];
	if(arguments.length === 1){
		stop = arguments[0];
		start = 0;
		step = 1;
	}else if(arguments.length === 2){
			step = 1;
	}
	while(start !== stop){
		result.push(start);
		start += step;
	}
	return result;
}
// console.log(range(10));
// console.log(range(1,11));
// console.log(range(0,30,5));
// console.log(range(0,-10,-1));
// console.log(range(0));

//Section 4 - Objects

// keys_.keys(object) 
// Retrieve all the names of the object's properties.

// _.keys({one: 1, two: 2, three: 3});
// => ["one", "two", "three"]

var keys = function(obj){
	var result = [];
	for(var i in obj){
		result.push(i);
	}
	return result;
}
// console.log(keys({one:1,two:2,three:3}));

// values_.values(object) 
// Return all of the values of the object's properties.

// _.values({one: 1, two: 2, three: 3});
// => [1, 2, 3]

var values = function(obj){
	var result = [];
	for(var i in obj){
		result.push(obj[i]);
	}
	return result;
}

// console.log(values({one:1,two:2,three:3}));

// pairs_.pairs(object) 
// Convert an object into a list of [key, value] pairs.

// _.pairs({one: 1, two: 2, three: 3});
// => [["one", 1], ["two", 2], ["three", 3]]

var pairs = function(obj){
	var result = [];
	for(var i in obj){
		var temp = [];
		temp.push(i);
		temp.push(obj[i]);
		result.push(temp);
	}
	return result;
}

// console.log(pairs({one:1,two:2,three:3}));

// invert_.invert(object) 
// Returns a copy of the object where the keys have become the values and the values the keys. For this to work, all of your object's values should be unique and string serializable.

// _.invert({Moe: "Moses", Larry: "Louis", Curly: "Jerome"});
// => {Moses: "Moe", Louis: "Larry", Jerome: "Curly"};

var invert = function(obj){
	var result = {};
	for(var i in obj){
		result[obj[i]] = i; 
	}

	return result;

}
//console.log(invert({moe:'moses',larry:'louis',curly:'jerome'}));

// functions_.functions(object) Alias: methods 
// Returns a sorted list of the names of every method in an object — that is to say, the name of every function property of the object.

// _.functions(_);
// => ["all", "any", "bind", "bindAll", "clone", "compact", "compose" ...
var functions = function(objc){

	function getMethods(obj) { // copied from stackoverflow
	  var result = [];
	  for (var id in obj) {
	    try {
	      if (typeof(obj[id]) == "function") {
	        result.push(id + ": " + obj[id].toString());
	      }
	    } catch (err) {
	      result.push(id + ": inaccessible");
	    }
	  }
	  return result;
	}

	return getMethods(objc);
}

//console.log(functions({}));

// extend_.extend(destination, *sources) 
// Copy all of the properties in the source objects over to the destination object, and return the destination object. It's in-order, so the last source will override properties of the same name in previous arguments.

// _.extend({name: 'moe'}, {age: 50});
// => {name: 'moe', age: 50}

var extend = function(destination){
	for(var i=1;i<arguments.length;i++){
		var cur = arguments[i];
		for(var y in cur){
			destination[y] = cur[y];
		}
	}
	return destination;
}

//console.log(extend({name:'moe'},{age:50}));


// pick_.pick(object, *keys) 
// Return a copy of the object, filtered to only have values for the whitelisted keys (or array of valid keys). Alternatively accepts a predicate indicating which keys to pick.

// _.pick({name: 'moe', age: 50, userid: 'moe1'}, 'name', 'age');
// => {name: 'moe', age: 50}
// _.pick({name: 'moe', age: 50, userid: 'moe1'}, function(value, key, object) {
//   return _.isNumber(value);
// });
// => {age: 50}

var pick = function(obj){

	var copy = {};
    var keys = [].slice.apply(arguments); 
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;

}

//console.log(pick({name: 'moe', age: 50, userid: 'moe1'}, 'name', 'age'));
//console.log(pick({name: 'moe', age: 50, userid: 'moe1'}, function(value, key, object) {return value;}));


// omit_.omit(object, *keys) 
// Return a copy of the object, filtered to omit the blacklisted keys (or array of keys). Alternatively accepts a predicate indicating which keys to omit.

// _.omit({name: 'moe', age: 50, userid: 'moe1'}, 'userid');
// => {name: 'moe', age: 50}
// _.omit({name: 'moe', age: 50, userid: 'moe1'}, function(value, key, object) {
//   return _.isNumber(value);
// });
// => {name: 'moe', userid: 'moe1'}

var omit = function(object){
	var result = {};

	var args = [].slice.apply(arguments);

	for(var i=1;i<args.length;i++){
		var cur = args[i];
		for(var key in object){
			if(key !== cur) result[key] = object[key];
		}
	}

	return result;

}
//console.log(omit({name: 'moe',age:50, userid: 'moe1'},'userid'));


// defaults_.defaults(object, *defaults) 
// Fill in undefined properties in object with the first value present in the following list of defaults objects.

// var iceCream = {flavor: "chocolate"};
// _.defaults(iceCream, {flavor: "vanilla", sprinkles: "lots"});
// => {flavor: "chocolate", sprinkles: "lots"}

var defaults = function(object){

	//iterate over the arguments from 1
	//check if each key in each argument object is present in the original object,
	//if it is, ignore, if it's not, add key and value.
	//return adjusted original

	var args = [].slice.apply(arguments);

	for(var i=1;i<args.length;i++){
		var curObj = args[i];
		for(var k in curObj){
			if(k in object){}
			else{
				object[k] = curObj[k];
			}
		}
	}
	return object;
}

//var iceCream = {flavor: "chocolate"};
//console.log(defaults(iceCream, {flavor:"vanilla", sprinkles: "lots"}));


// clone_.clone(object) 
// Create a shallow-copied clone of the provided plain object. Any nested objects or arrays will be copied by reference, not duplicated.

// _.clone({name: 'moe'});
// => {name: 'moe'};

var clone = function(obj){
	var result = {};

	for(var i in obj){
		result[i] = obj[i];
	}
	return result;
}

//console.log(clone({name:'moe'}));

// tap_.tap(object, interceptor) 
// Invokes interceptor with the object, and then returns object. The primary purpose of this method is to "tap into" a method chain, in order to perform operations on intermediate results within the chain.

// _.chain([1,2,3,200])
//   .filter(function(num) { return num % 2 == 0; })
//   .tap(alert)
//   .map(function(num) { return num * num })
//   .value();
// => // [2, 200] (alerted)
// => [4, 40000]

var tap = function(obj,interceptor){

	return interceptor(obj);
}


// has_.has(object, key) 
// Does the object contain the given key? Identical to object.hasOwnProperty(key), but uses a safe reference to the hasOwnProperty function, in case it's been overridden accidentally.

// _.has({a: 1, b: 2, c: 3}, "b");
// => true

var has = function(object,key){

	for(var i in object){
		if(key === i)return true;
	}
	return false;
}
//console.log(has({a:1,b:2,c:3},'b'));

// property_.property(key) 
// Returns a function that will itself return the key property of any passed-in object.

// var stooge = {name: 'moe'};
// 'moe' === _.property('name')(stooge);
// => true

var property = function(key){

	return function(obj){
		for(var i in obj){
			if(key === i) return true;
		}
	}
}

//var stooge = {name: 'moe'};
//console.log(property('name')(stooge));

// propertyOf_.propertyOf(object) 
// Inverse of _.property. Takes an object and returns a function which will return the value of a provided property.

// var stooge = {name: 'moe'};
// _.propertyOf(stooge)('name');
// => 'moe'

var propertyOf = function(object){


}
