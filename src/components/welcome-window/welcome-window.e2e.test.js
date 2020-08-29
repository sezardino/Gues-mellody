import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import WelcomeWindow from "./welcome-window.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

describe("Welcome window", () => {
  let component, onWelcomeButtonClick;
  beforeEach(() => {
    onWelcomeButtonClick = jest.fn();
    component = shallow(
      <WelcomeWindow
        lives={1}
        time={1}
        onWelcomeButtonClick={onWelcomeButtonClick}
        questions={[]}
      />
    );
  });
  it(`Should welcome button be pressed`, () => {
    const welcomeButton = component.find(`button.welcome__button`);
    welcomeButton.props().onClick();
    expect(onWelcomeButtonClick.mock.calls.length).toBe(1);
  });
});
