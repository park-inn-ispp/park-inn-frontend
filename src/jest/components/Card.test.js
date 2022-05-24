import Card from "../../components/Card";
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({adapter: new Adapter()});



test('Renderizar una Card vacía', () => {

    const emptyCard = shallow(<Card />);

    expect(emptyCard.text()).toEqual('PRECIO: €EditarReservasEliminar');
  
});

test('Renderizar una Card no vacía', () => {

    const notEmptyCard = shallow(<Card  title={"test 1 title"} ancho={"test 1 ancho"} largo={"test 1 largo"} precioHora={"test 1 precioHora"} esAireLibre={"test 1 esAireLibre"} urlEdit={"test 1 urlEdit"} urlReserva={"test 1 urlReserva"}/>);

    expect(notEmptyCard.text()).toEqual("test 1 titlePRECIO: test 1 precioHora€EditarReservasEliminar");
  
});


test('Renderizar una Card no vacía sin titulo', () => {

    const notEmptyCard = shallow(<Card  ancho={"test 1 ancho"} largo={"test 1 largo"} precioHora={"test 1 precioHora"} esAireLibre={"test 1 esAireLibre"} urlEdit={"test 1 urlEdit"} urlReserva={"test 1 urlReserva"}/>);

    expect(notEmptyCard.text()).toEqual("PRECIO: test 1 precioHora€EditarReservasEliminar");
  
});