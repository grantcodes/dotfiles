import { assistantWindow } from '../../Assistant'

const AssistantButton = () => (
  <button
    onClicked={() => {
      assistantWindow.visible = !assistantWindow.visible
    }}
  >
    <image icon_name="autocorrection-symbolic" />
  </button>
)

export { AssistantButton }
