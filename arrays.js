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
				if(Array.isArray(val)) deepFind(val);
				else result.push(val);
			});
		}
	}

	deepFind(array);
	return result;

}

console.log(flatten([5,4,[[3]],2,[[[2],4],1]]));