const express = require('express');
const app = new express();
const sql = require('mssql');
//const cors = require('cors');
//const CC = require('./CoordConverter.js');

//app.use(new cors());

//const coordConverter =  new CC();

const config = {
    user: 'PCTO',  //Vostro user name
    password: 'xxx123#', //Vostra password
    server: "213.140.22.237",  //Stringa di connessione
    database: 'Katmai', //(Nome del DB)
}

app.get('/', function (req, res) {
    //res.send('Hello World!');
    sql.connect(config, (err) => {
        if (err) console.log(err);  // ... error check
        else makeSqlRequest(res);     // 
    });
});

function makeSqlRequest(res) {
    let sqlRequest = new sql.Request();  //sqlRequest: oggetto che serve a eseguire le query
    let q = 'SELECT DISTINCT TOP (100) [GEOM].STAsText() FROM [Katmai].[dbo].[interventiMilano]';
    //eseguo la query e aspetto il risultato nella callback
    sqlRequest.query(q, (err, result) => {sendQueryResults(err,result,res)}); 
}

function sendQueryResults(err,result, res)
{
    if (err) console.log(err); // ... error checks
    res.send(result.recordset);  //Invio il risultato al Browser
}

/*function sendQueryResults(err,result, res)
{
    if (err) console.log(err); // ... error checks
    res.send(coordConverter.generateGeoJson(result.recordset));  //Invio il risultato al Browser
}*/





app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

