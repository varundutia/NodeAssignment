const axios = require('axios');
require('dotenv').config();
const URL = process.env.URL;
const totalAmountString = 'totalAmount';
const comparator = require('../Helpers/server.comparator');
const dateDifference = require('../Helpers/server.dateDiff');


class Controller {
    
    //API to return all the campaigns sorted in descending order of total Amount
    static getDescendingCampaigns(request, response){
        axios.get(URL)
    .then(res => {
        let campaignArray = res.data;

        campaignArray.sort(comparator(totalAmountString));

        var responseArray = [];
        var responseData = {};
        for(let campaignIndex = 0;campaignIndex < campaignArray.length; campaignIndex++){
            responseData.title = campaignArray[campaignIndex].title;
            responseData.backersCount = campaignArray[campaignIndex].backersCount;
            responseData.totalAmount = campaignArray[campaignIndex].totalAmount;
            responseData.endDate = campaignArray[campaignIndex].endDate;
            responseArray.push( {...responseData} );
        }
        response.send(responseArray);
    })
    .catch(error => {
        console.log(error);
    });
    }

    // API to get the active campaigns and the campaigns that were started before 30 days
    static getActiveCampaigns(request, response){
            axios.get(URL)
        .then(res => {
            let campaignArray = res.data;
            var responseArray = [];
            var responseData = {};
            for(let campaignIndex = 0;campaignIndex < campaignArray.length; campaignIndex++){
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
    }

    // API to get the closed campaigns 
    static getClosedCampaigns(request, response){
        axios.get(URL)
    .then(res => {
        let campaignArray = res.data;
        var responseArray = [];
        var responseData = {};
        for(let campaignIndex = 0; campaignIndex < campaignArray.length; campaignIndex++){

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
    }

}

module.exports = Controller;