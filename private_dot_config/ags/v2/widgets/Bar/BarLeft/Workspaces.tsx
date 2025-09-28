import { createBinding, createComputed, For } from 'ags'
import Gtk from 'gi://Gtk?version=4.0'
import Hyprland from 'gi://AstalHyprland'

const Workspaces = () => {
  const hypr = Hyprland.get_default()
  const workspaces = createComputed(
    [
      createBinding(hypr, 'workspaces'),
      createBinding(hypr, 'focused_workspace'),
    ],
    (wss, focused) => {
      const visible = []

      wss
        .filter((ws) => ws.get_id() > 0)
        .sort((a, b) => a.get_id() - b.get_id())
        .forEach((ws) =>
          visible.push({ id: ws.id, focused: ws.id === focused.id })
        )

      return visible
    }
  )

  return (
    <box class="workspaces" valign={Gtk.Align.CENTER}>
      <For each={workspaces}>
        {(workspace) => (
          <button
            class={workspace.focused ? 'workspace is-focused' : 'workspace'}
            onClicked={() =>
              hypr.dispatch('workspace', workspace.id.toString())
            }
          >
            {workspace.id}
          </button>
        )}
      </For>
    </box>
  )
}

export { Workspaces }
