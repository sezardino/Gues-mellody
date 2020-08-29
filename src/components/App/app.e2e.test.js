import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./app.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

describe("App", () => {
  let component, btn, fn, instance;
  beforeEach(() => {
    component = shallow(<App time={1} lives={1} questions={[]} />);
    instance = component.instance();
    btn = component.find("button");
    fn = jest.fn();
  });
  it("Handler change state", () => {
    expect(component.state().currentWindow).toBe(-1);
    instance.buttonHandler();
    expect(component.state().currentWindow).toBe(-1);
  });
});
