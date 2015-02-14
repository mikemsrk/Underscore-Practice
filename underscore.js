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


