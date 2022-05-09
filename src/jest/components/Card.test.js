import Card from "../../components/Card";
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import executeScript from '../executor.ts'
require('path').basename(__dirname);
import {Connection} from 'sqlcmd'

let script = "INSERT INTO [dbo].[clients]  ([email],[name],[password],[phone],[surname]) VALUES ('t','t','t','t','t')"

test('Renderizar una Card vacía', () => {

    executeScript(script)
});

