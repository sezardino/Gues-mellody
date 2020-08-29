import React from "react";
import renderer from "react-test-renderer";
import WelcomeWindow from "./welcome-window.jsx";

it(`Should WelcomeScreen render correctly`, () => {
  const tree = renderer
    .create(
      <WelcomeWindow
        lives={1}
        time={1}
        onWelcomeButtonClick={() => {}}
        questions={[]}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
