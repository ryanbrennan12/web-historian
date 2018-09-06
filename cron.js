var CronJob = require('cron').CronJob;
var fetcher = require(__dirname + '/workers/htmlFetcher.js');


new CronJob('* * * * * *', () => {
  console.log(fetcher);
  console.log('you will see this message every second');
}, null, true, 'America/Los_Angeles');


