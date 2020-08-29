import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

it(`Render App`, () => {
  const tree = renderer
    .create(<App time={1} lives={1} questions={[]} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
