import Card from "../../components/Card";
import renderer from 'react-test-renderer';


test('render a card', () => {
    const component = renderer.create(
        <Card />,
      );
  
});
