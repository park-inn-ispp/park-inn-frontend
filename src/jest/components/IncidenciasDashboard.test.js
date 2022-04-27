import IncidenciasDashboard from "../../Dashboard/IncidenciasDashboard";
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({adapter: new Adapter()});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
  })
);

test('Incidencias dashboard empty', () => {

    const dashboard = <IncidenciasDashboard />;
     const tree = renderer
     .create(dashboard)
     .toJSON();

    console.log(tree)
    expect(tree).toMatchSnapshot();
});