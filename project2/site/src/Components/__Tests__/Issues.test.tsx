import renderer from 'react-test-renderer';
import Issues from '../Issues';

test('Snapshot test Issues', () => {
    const tree = renderer.create(<Issues />).toJSON();
    expect(tree).toMatchSnapshot();
});
