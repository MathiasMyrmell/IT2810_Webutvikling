import { Provider } from 'react-redux';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { render } from '@testing-library/react';
import store from '../Redux/store';
import renderer from 'react-test-renderer';
import Home from '../Home/Home';
import { RecipeData } from '../Home/Home';
import React from 'react';

const client = new ApolloClient({
    uri: 'http://it2810-30.idi.ntnu.no:8080/graphql',
    cache: new InMemoryCache(),
});

interface dataResult {
    recipes: Array<RecipeData>
}

const mock: dataResult = {
    recipes: [
        { id: 0, title: "test0", directions: ["a", "b"], ingredients: ["c, d"] },
        { id: 1, title: "test1", directions: ["e", "f"], ingredients: ["f, g"] }
    ]
}

test('Snapshot test Home with mock data', () => {
    const tree = renderer.create(
        <ApolloProvider client={client}>
            <React.StrictMode>
                <Provider store={store}>
                    <Home {...mock} />
                </Provider>
            </React.StrictMode>
        </ApolloProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});