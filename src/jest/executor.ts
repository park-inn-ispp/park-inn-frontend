import { exec } from 'child_process';

function executeScript(file){
    exec('sqlcmd -S parkinn-dbsprint3.database.windows.net -U administrador -P Ispp2022 -d parkinn-dbsprint3  -l 60 -i ' + file);

}

export default executeScript;