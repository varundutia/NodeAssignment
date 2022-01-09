// Comparator function for the sort method
function comparator(field){

    return function(data1,data2){
        if(data1[field]>data2[field]){
            return -1;
        }
        return 1;
    }

}

module.exports = comparator;