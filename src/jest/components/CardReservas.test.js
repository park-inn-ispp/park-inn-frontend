import CardReservas from '../../components/CardReservas'; 
import Enzyme, {shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({adapter: new Adapter()});

test('Renderizar una CardReservas vacía', () => {

    const emptyCard = shallow(<CardReservas />);

    expect(emptyCard.text()).toEqual('Fecha Inicio: Fecha Fin: Precio Total:  €');
  
});

test('Renderizar una CardReservas no vacía', () => {

    const notEmptyCard = shallow(<CardReservas   id={"1"} title={"test 1 title"} propietario={"test 1 propietario"} 
    fechaInicio={"test 1 fechaInicio"} fechaFin={"test 1 fechaFin"} precioTotal={"test 1 precioTotal"}
    urlCancelar={"test 1 urlCancelar"} urlDetalles={"test 1 urlDetalles"}  />);

    expect(notEmptyCard.text()).toEqual("Fecha Inicio: test 1 fechaInicioFecha Fin: test 1 fechaFinPrecio Total: test 1 precioTotal €");
  
});

test('Renderizar una CardReservas sin titulo vacía', () => {

    const notEmptyCard = shallow(<CardReservas   id={"1"} propietario={"test 1 propietario"} 
    fechaInicio={"test 1 fechaInicio"} fechaFin={"test 1 fechaFin"} precioTotal={"test 1 precioTotal"}
    urlCancelar={"test 1 urlCancelar"} urlDetalles={"test 1 urlDetalles"}  />);

    expect(notEmptyCard.text()).toEqual("Fecha Inicio: test 1 fechaInicioFecha Fin: test 1 fechaFinPrecio Total: test 1 precioTotal €");
  
});