const express = require('express');
const axios = require('axios');

const app = express();

function comparator(field){
    return function(data1,data2){
        console.log(data1[field]>data2[field]);
        if(data1[field]>data2[field]){
            return -1;
        }
        return 1;
    }
}

function compareDates(data1,data2){
    date1 = new Date(data1);
    date2 = new Date(data2);
    date1.setHours(0,0,0,0);
    date2.setHours(0,0,0,0);
    if(date1>date2){
        return -1;
    }
    return 1;
}

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

app.get('/activeCampaigns',function(request,response){

    axios.get('https://testapi.donatekart.com/api/campaign')
    .then(res => {
        // console.log(res.data);
        let campaignArray = res.data;
        for(let campaignIndex=0;campaignIndex<campaignArray.length;campaignIndex++){
            
        }
        response.send(responseArray);
    })
    .catch(error => {
        console.log(error);
    });

});


app.listen(3000);