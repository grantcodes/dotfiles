import { controlCenterVisible } from "../../ControlCenter";

const ControlCenterButton = () => (
  <button onClick={() => controlCenterVisible.set(!controlCenterVisible.get())}>
    <icon icon="configuration-symbolic" />
  </button>
);

export { ControlCenterButton };
