import renderer from 'react-test-renderer';
import Navbar from '../Navbar';

test('Snapshot test Navbar', () => {
    const tree = renderer.create(<Navbar />).toJSON();
    expect(tree).toMatchSnapshot();
});
