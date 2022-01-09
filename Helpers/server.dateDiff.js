
// Function to find the number of days between 2 dates
function dateDifference(date1,date2){

    var timeDifference = date2.getTime() - date1.getTime();
    var days = timeDifference / (1000 * 3600 * 24);

    return days;

}

module.exports = dateDifference;