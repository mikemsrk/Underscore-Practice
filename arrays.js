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


/*	last_.last(array, [n]) 
Returns the last element of an array. Passing n will return the last n elements of the array.

_.last([5, 4, 3, 2, 1]);
=> 1*/