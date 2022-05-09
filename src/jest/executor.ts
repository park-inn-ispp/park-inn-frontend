import { exec } from 'child_process';
require('path').basename(__dirname);

function executeScript(script){

    exec('sqlcmd -S parkinn-dbsprint3.database.windows.net -U administrador -P Ispp2022 -d parkinn-dbsprint3  -l 60 -Q "' +script+'"');
    
}

export default executeScript;