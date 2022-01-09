const express = require('express');
const Route = express.Router();
const Controller = require('../Controllers/server.controller');

Route.get('/descendingCampaigns', Controller.getDescendingCampaigns);
Route.get('/activeCampaigns', Controller.getActiveCampaigns);
Route.get('/closedCampaigns',Controller.getClosedCampaigns);

module.exports = Route;