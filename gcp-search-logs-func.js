/**
 * Cloud Function that searches logs
 * 
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

 const {Logging} = require('@google-cloud/logging');
 const PROJECT_ID="beaming-source-302514"
 const LOG_NAME="loggingFun"
 
 const logging = new Logging();
 const log = logging.log(LOG_NAME);
 
 async function printEntryMetadata() {
   const cutoff = new Date(Date.now() - (15 * 60000)); //-- only look at the last 15 minutes of the log stream
   const filter = `timestamp >= "${cutoff.toISOString()}" AND textPayload="Chris"`
   
   // List the most recent entries for a given log
   // See https://googleapis.dev/nodejs/logging/latest/Logging.html#getEntries
   const [entries] = await log.getEntries({filter:filter, pageSize:1});
   console.log('Logs:');
   entries.forEach(entry => {
     const metadata = entry.metadata;
     console.log(`${metadata.timestamp}:`, metadata[metadata.payload]);
   });
 }
 
 exports.searchLogs = async (req, res) => {
   let start = new Date();
   await printEntryMetadata();
   let end = new Date();
   let duration = Math.abs(end - start);
   let message = `Search took ${duration} ms`;
   res.status(200).send(message);
 };
 