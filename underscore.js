/*each_.each(list, iteratee, [context]) Alias: forEach 
Iterates over a list of elements, yielding each in turn to an iteratee function. 
The iteratee is bound to the context object, if one is passed. 
Each invocation of iteratee is called with three arguments: (element, index, list). 
If list is a JavaScript object, iteratee's arguments will be (value, key, list). Returns the list for chaining.

_.each([1, 2, 3], alert);
=> alerts each number in turn...
_.each({one: 1, two: 2, three: 3}, alert);
=> alerts each number value in turn...*/

var each = function(list, iteratee){

	if(Array.isArray(list)){
		list.forEach(function(item){
			iteratee(item);
		});
	}else if(typeof list === 'object'){
		for(var item in list){
			iteratee(list[item]);
		}
	}
}

//each([1,2,3],console.log);
//each({one:1,two:2,three:3},console.log);

/*map_.map(list, iteratee, [context]) Alias: collect 
Produces a new array of values by mapping each value in list through a transformation function (iteratee). If list is a JavaScript object, iteratee's arguments will be (value, key, list).

_.map([1, 2, 3], function(num){ return num * 3; });
=> [3, 6, 9]
_.map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; });
=> [3, 6, 9]*/

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

/*reduce_.reduce(list, iteratee, [memo], [context]) Aliases: inject, foldl 
Also known as inject and foldl, reduce boils down a list of values into a single value. 
Memo is the initial state of the reduction, and each successive step of it should be returned by iteratee. 
The iteratee is passed four arguments: the memo, then the value and index (or key) of the iteration, 
and finally a reference to the entire list.

If no memo is passed to the initial invocation of reduce, the iteratee is not invoked on the first element of the list. The first element is instead passed as the memo in the invocation of the iteratee on the next element in the list.

var sum = _.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0);
=> 6*/

var reduce = function(list,iteratee,start){
	if(start === undefined){
		start = list.unshift();
	}
	each(list,function(num){
		start = iteratee(start,num);
	});

	return start;

}

//console.log(reduce([1,2,3], function(memo,num){return memo + num; }, 0));