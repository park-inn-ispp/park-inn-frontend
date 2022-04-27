import CardReservas from '../../components/CardReservas'; 
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import navegarSnapshot from "../testUtility/navegarSnapshots"
Enzyme.configure({adapter: new Adapter()});

test('Renderizar una CardReservas vacía', () => {

    const emptyCard = shallow(<CardReservas />);

    expect(emptyCard.text()).toEqual('Fecha Inicio : -Fecha Fin : -Precio total : -CancelarDetalles');
  
});

test('Renderizar una CardReservas no vacía', () => {

    const notEmptyCard = shallow(<CardReservas   id={"1"} title={"test 1 title"} propietario={"test 1 propietario"} 
    fechaInicio={"test 1 fechaInicio"} fechaFin={"test 1 fechaFin"} precioTotal={"test 1 precioTotal"}
    urlCancelar={"test 1 urlCancelar"} urlDetalles={"test 1 urlDetalles"}  />);

    expect(notEmptyCard.text()).toEqual("test 1 titleFecha Inicio : test 1 fechaInicioFecha Fin : test 1 fechaFinPrecio total : test 1 precioTotal€CancelarDetalles");
  
});

test('Renderizar una CardReservas sin titulo vacía', () => {

    const notEmptyCard = shallow(<CardReservas   id={"1"} propietario={"test 1 propietario"} 
    fechaInicio={"test 1 fechaInicio"} fechaFin={"test 1 fechaFin"} precioTotal={"test 1 precioTotal"}
    urlCancelar={"test 1 urlCancelar"} urlDetalles={"test 1 urlDetalles"}  />);

    expect(notEmptyCard.text()).toEqual("Fecha Inicio : test 1 fechaInicioFecha Fin : test 1 fechaFinPrecio total : test 1 precioTotal€CancelarDetalles");
  
});

test('Renderizar una CardReservas no vacía con estado cancelada', () => {

    const estado = "cancelada"

    const notEmptyCard = <CardReservas   id={"1"} propietario={"test 1 propietario"} 
    fechaInicio={"test 1 fechaInicio"} fechaFin={"test 1 fechaFin"} precioTotal={"test 1 precioTotal"}
     estado={estado} urlCancelar={"test 1 urlCancelar"} urlDetalles={"test 1 urlDetalles"}  />;

     const tree = renderer
     .create(notEmptyCard)
     .toJSON();

     var elemento = navegarSnapshot(tree,"div>div>p>div")

     expect(elemento.props["className"]).toBe("cancelada");
});

test('Renderizar una CardReservas no vacía con los diferentes estados', () => {

    const estado = "pendiente"

    const notEmptyCard = <CardReservas   id={"1"} propietario={"test 1 propietario"} 
    fechaInicio={"test 1 fechaInicio"} fechaFin={"test 1 fechaFin"} precioTotal={"test 1 precioTotal"}
     estado={estado} urlCancelar={"test 1 urlCancelar"} urlDetalles={"test 1 urlDetalles"}  />;

     const tree = renderer
     .create(notEmptyCard)
     .toJSON();

     var elemento = navegarSnapshot(tree,"div>div>p>div")
     
     expect(elemento.props["className"]).toBe(estado);
});

test('Renderizar una CardReservas no vacía con estado aceptada', () => {

    const estado = "aceptada"

    const notEmptyCard = <CardReservas   id={"1"} propietario={"test 1 propietario"} 
    fechaInicio={"test 1 fechaInicio"} fechaFin={"test 1 fechaFin"} precioTotal={"test 1 precioTotal"}
     estado={estado} urlCancelar={"test 1 urlCancelar"} urlDetalles={"test 1 urlDetalles"}  />;

     const tree = renderer
     .create(notEmptyCard)
     .toJSON();

     var elemento = navegarSnapshot(tree,"div>div>p>div")
     
     expect(elemento.props["className"]).toBe(estado);
});