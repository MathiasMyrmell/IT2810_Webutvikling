import renderer from 'react-test-renderer';
import VerticalBar from '../VerticalBar';

test('Snapshot test VerticalBar', () => {

    const prop = {
        dataValues: [1, 2, 3],
        labels: ["A", "B", "C"]
    };

    const tree = renderer.create(<VerticalBar data={prop} title='title' />).toJSON();
    expect(tree).toMatchSnapshot();
});
