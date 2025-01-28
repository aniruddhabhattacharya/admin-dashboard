const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const moment = require('moment');

async function readCSV(filePath) {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }

  function checkDuration(timestamp, duration) {
    const date = moment(timestamp, 'YYYY-MM-DD HH:mm:ss');
    const now = moment();
  
    switch (duration) {
      case 'Last Month':
        return date.isBetween(now.clone().subtract(1, 'months').startOf('month'), now.clone().subtract(1, 'months').endOf('month'));
      case 'This Month':
        return date.isBetween(now.clone().startOf('month'), now.clone().endOf('month'));
      case 'Last 3 Months':
        return date.isBetween(now.clone().subtract(3, 'months'), now);
      case 'Last 6 Months':
        return date.isBetween(now.clone().subtract(6, 'months'), now);
      case 'This Year':
        return date.isSameOrAfter(now.clone().startOf('year')) && date.isBefore(now.clone().endOf('year'));
      case 'Last Year':
        return date.isBetween(now.clone().subtract(1, 'year').startOf('year'), now.clone().subtract(1, 'year').endOf('year'));
      default:
        return true; 
    }
  }
  

const service = {
    getData: async (req, res) => {
        const filePath = '../dataops/app/public/data/sample-data-v2.csv'; // Replace with your CSV file path
        const { make, duration } = req.query;
        try {

            const data = await readCSV(filePath);
            const filteredData = data.filter(item => {
                console.log(item, make)
                const makeFilter = make ? make.split(',').includes(item.brand) : true;
                const durationFilter = duration ? checkDuration(item.timestamp, duration) : true;
        
                return makeFilter && durationFilter;
            });
        
            return ({
                status: "success",
                response: (make && duration) ? filteredData : data
            })
        } catch(err) {
            return ({
                status: "error",
                response: err.toString()
            })
        }
    }
}

module.exports = service;