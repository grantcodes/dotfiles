import { controlCenterWindow } from '../../ControlCenter'

const ControlCenterButton = () => (
  <button
    onClicked={() => {
      controlCenterWindow.visible = !controlCenterWindow.visible
    }}
  >
    <image icon_name="configuration-symbolic" />
  </button>
)

export { ControlCenterButton }
