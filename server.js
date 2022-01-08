const express = require('express');
const axios = require('axios');

// Imports End

//Express Application
const app = express();

// Comparator function for the sort method
function comparator(field){

    return function(data1,data2){
        if(data1[field]>data2[field]){
            return -1;
        }
        return 1;
    }

}

// Function to find the number of days between 2 dates
function dateDifference(date1,date2){

    var timeDifference = date2.getTime() - date1.getTime();
    var days = timeDifference / (1000 * 3600 * 24);

    return days;

}

//API to return all the campaigns sorted in descending order of total Amount
app.get('/descendingCampaigns',function(request,response){

    axios.get('https://testapi.donatekart.com/api/campaign')
    .then(res => {
        // console.log(res.data);
        let campaignArray = res.data;
        campaignArray.sort(comparator("totalAmount"));
        // console.log(campaignArray);
        var responseArray = [];
        var responseData = {};
        for(let campaignIndex=0;campaignIndex<campaignArray.length;campaignIndex++){
            responseData.title = campaignArray[campaignIndex].title;
            responseData.backersCount = campaignArray[campaignIndex].backersCount;
            responseData.totalAmount = campaignArray[campaignIndex].totalAmount;
            responseData.endDate = campaignArray[campaignIndex].endDate;
            responseArray.push({...responseData});
        }
        response.send(responseArray);
    })
    .catch(error => {
        console.log(error);
    });

});

// API to get the active campaigns and the campaigns that were started before 30 days
app.get('/activeCampaigns',function(request,response){

    axios.get('https://testapi.donatekart.com/api/campaign')
    .then(res => {
        let campaignArray = res.data;
        var responseArray = [];
        var responseData = {};
        for(let campaignIndex=0;campaignIndex<campaignArray.length;campaignIndex++){
            let today = new Date();
            let startDate = new Date(campaignArray[campaignIndex].created);
            let endDate = new Date(campaignArray[campaignIndex].endDate);
            if(dateDifference(today,endDate) >= 1){
                if(dateDifference(startDate,today) <= 30){
                    responseData = campaignArray[campaignIndex];
                    responseArray.push({...responseData});
                }
            }
        }
        response.send(responseArray);
    })
    .catch(error => {
        console.log(error);
    });
});

// API to get the closed campaigns 
app.get('/closedCampaigns',function(request,response){

    axios.get('https://testapi.donatekart.com/api/campaign')
    .then(res => {
        let campaignArray = res.data;
        var responseArray = [];
        var responseData = {};
        for(let campaignIndex=0;campaignIndex<campaignArray.length;campaignIndex++){

            let today = new Date();
            let endDate = new Date(campaignArray[campaignIndex].endDate);
            let totalAmout = campaignArray[campaignIndex].totalAmount;
            let procuredAmount = campaignArray[campaignIndex].procuredAmount;
            
            if(dateDifference(today,endDate) < 0 || procuredAmount >= totalAmout){
                responseData = campaignArray[campaignIndex];
                responseArray.push({...responseData});
            }

        }
        response.send(responseArray);
    })
    .catch(error => {
        console.log(error);
    });
});


// Server started at port 3000 
app.listen(3000);