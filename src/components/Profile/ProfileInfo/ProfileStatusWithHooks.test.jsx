import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
      const component = create(<ProfileStatus status="test" />);
      const instance = component.getInstance();
      expect(instance.state.status).toBe("test");
    });

    test("after creation <span> with status should be displayed", () => {
      const component = create(<ProfileStatus status="test" />);
      const root = component.root;
      let span = root.findAllByType("span");
      expect(span.length).not.toBe(0);
    });

    test("after creation <input> shouldn't be displayed", () => {
      const component = create(<ProfileStatus status="test" />);
      const root = component.root;
      let textarea = root.findAllByType("textarea");
      expect(textarea.length).toBe(0);
    });

    test("after creation <span> should be displayed with correct status", () => {
      const component = create(<ProfileStatus status="test" />);
      const root = component.root;
      let span = root.findByType("span");
      expect(span.children[0]).toBe("test");
    });

    test("<input> should be displayed in Edit Mode instead of <span>", () => {
      const component = create(<ProfileStatus status="test" />);
      const root = component.root;
      let span = root.findByType("span");
      span.props.onDoubleClick();
      let textarea = root.findByType("textarea");
      expect(textarea.props.value).toBe("test");
    });

    test("callback should be", () => {
      const mockCallback = jest.fn();
      const component = create(<ProfileStatus status="test" updateStatus={mockCallback} />);
      const instance = component.getInstance();
      instance.deactivateEditMode();
      expect(mockCallback.mock.calls.length).not.toBe(0);
    });
  });