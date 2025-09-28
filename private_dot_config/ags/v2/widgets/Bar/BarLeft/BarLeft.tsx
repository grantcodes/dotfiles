import Gtk from 'gi://Gtk?version=4.0'
import { Workspaces } from './Workspaces'
import { FocusedClient } from './FocusedClient'
import { AssistantButton } from './AssistantButton'

const BarLeft = () => (
  <box class="bar__left" hexpand halign={Gtk.Align.START} $type="start">
    <AssistantButton />
    <Workspaces />
    <FocusedClient />
  </box>
)

export { BarLeft }
