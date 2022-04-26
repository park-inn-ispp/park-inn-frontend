import Card from "../../components/Card";
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({adapter: new Adapter()});



test('Renderizar una Card vacía', () => {

    const emptyCard = shallow(<Card />);

    expect(emptyCard.text()).toEqual('Ancho : -Largo : -Precio por hora : -Al aire libre : -Ver detalles/editarReservas');
  
});

test('Renderizar una Card no vacía', () => {

    const notEmptyCard = shallow(<Card  title={"test 1 title"} ancho={"test 1 ancho"} largo={"test 1 largo"} precioHora={"test 1 precioHora"} esAireLibre={"test 1 esAireLibre"} urlEdit={"test 1 urlEdit"} urlReserva={"test 1 urlReserva"}/>);

    expect(notEmptyCard.text()).toEqual("test 1 titleAncho : test 1 anchomLargo : test 1 largomPrecio por hora : test 1 precioHora€Al aire libre : test 1 esAireLibreVer detalles/editarReservas");
  
});


test('Renderizar una Card no vacía sin titulo', () => {

    const notEmptyCard = shallow(<Card  ancho={"test 1 ancho"} largo={"test 1 largo"} precioHora={"test 1 precioHora"} esAireLibre={"test 1 esAireLibre"} urlEdit={"test 1 urlEdit"} urlReserva={"test 1 urlReserva"}/>);

    expect(notEmptyCard.text()).toEqual("Ancho : test 1 anchomLargo : test 1 largomPrecio por hora : test 1 precioHora€Al aire libre : test 1 esAireLibreVer detalles/editarReservas");
  
});