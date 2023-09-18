import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import Home from '../index';

test('Snapshot test Home/index', () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Incorrect input test form Home/index', async () => {
    const { container } = render(<Home />);

    document.getElementsByTagName('button')[0].click();

    await new Promise(res => setTimeout(res, 256));

    const text = screen.getByText(/Kombinasjon av URL og token er ikke gyldig./i);
    expect(text).toBeInTheDocument();
});
