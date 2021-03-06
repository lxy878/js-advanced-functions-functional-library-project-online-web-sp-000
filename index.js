const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, cb) {
      const newCollection = (Array.isArray(collection)) ? [...collection] : Object.values(collection);
      for (const element of newCollection)
        cb(element);

      return collection;
    },

    map: function(collection, cb) {
      const newCollection = (Array.isArray(collection)) ? [...collection] : Object.values(collection);
      const results = [];
      for(const element of newCollection)
        results.push(cb(element));

      return results;
    },

    reduce: function(collection, cb, initial) {
      const newCollection = collection.slice(1);
      let result = 0;
      if (initial)
        result = initial + cb(result, collection[0]);
      else
        result = collection[0];

      for (const n of newCollection)
        result = cb(result, n);

      return result;
    },

    find: function(collection, predicate){
      const newCollection = [...collection];
      for(const n of newCollection)
        if (predicate(n))
          return n;
    },

    filter: function(collection, predicate){
      const newCollection = [...collection];
      const results = [];
      for(const n of newCollection)
        if(predicate(n))
          results.push(n);
      return results;
    },

    size: function(collection){
      return (collection instanceof Array) ? collection.length:Object.keys(collection).length;
    },

    first: function(array, nth){
      return nth ? array.slice(0, nth):array[0]
    },

    last: function(array, nth){
      return nth ? array.slice(array.length-nth):array[array.length-1]
    },

    compact: function(array){
      const newArray = [];
      for (const n of array)
        if (n)
          newArray.push(n);
      return newArray;
    },

    sortBy: function(array, cb){
      const newArray = [...array];
      return newArray.sort((a,b)=> cb(a)-cb(b));
    },

    flatten: function(array, shallow){
      let newArray = [];
      if (shallow){
        newArray = array.reduce((collection, current) => {
          if(Array.isArray(current)){
            for (const e of current) collection.push(e);
          }else {
            collection.push(current)
          }
          console.log(collection)
          return collection;
        }, [])
      }else{
        const re = (array, newArray) => {
          for(const e of array){
            if(Array.isArray(e)){
              re(e, newArray);
            }else{
              newArray.push(e);
            }
          }
        }
        re(array, newArray);
      }
      return newArray;
    },

    uniq: function(array, isSorted, callback){
      const newArray = [array[0]];
      let cb = (e) => e;
      if (isSorted){
        for(let i=1; i<array.length; i++){
          if (array[i-1] !== array[i]) {
            newArray.push(array[i])
          }
        }
      }else{
        if (callback) cb = callback;
        for(let i=1; i<array.length; i++){
          if(!newArray.find(e => cb(e) === cb(array[i]))){
            newArray.push(array[i])
          }
        }
      }
      return newArray;
    },

    keys: function(object){
      return Object.keys(object);
    },

    values: function(object){
      return Object.values(object);
    },

    functions: function(object) {
      const keychain = [];
      for(const key in object){
        if (typeof object[key] === 'function')
          keychain.push(key);
      }
      return keychain.sort();
    }
  }
})()
