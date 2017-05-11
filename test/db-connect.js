/**
 * Created by yangxun on 16/7/6.
 */
var db = require('../common/db-helper');


function* one(){
    yield setTimeout(function(){
        return 1;
    }, 2000);
}


function* two(){
    yield 1;
    yield 2;
    //var numb = one();
    yield* one();
    yield 4;
}

var ite = two();
