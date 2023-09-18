import renderer from 'react-test-renderer';
import IssuesList from '../IssuesList';

test('Snapshot test IssuesList', () => {
    const tree = renderer.create(<IssuesList />).toJSON();
    expect(tree).toMatchSnapshot();
});
