import renderer from 'react-test-renderer';
import Commits from '../Commits';

test('Snapshot test Commits', () => {
    const tree = renderer.create(<Commits />).toJSON();
    expect(tree).toMatchSnapshot();
});