// importing
import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js'
import Widget from 'resource:///com/github/Aylur/ags/widget.js'
import { exec, execAsync } from 'resource:///com/github/Aylur/ags/utils.js'

// widgets can be only assigned as a child in one container
// so to make a reuseable widget, just make it a function
// then you can use it by calling simply calling it

const Workspaces = () => {
  return Widget.Box({
    className: 'workspaces',
    connections: [
      [
        Hyprland.active.workspace,
        (self) => {
          // generate an array [1..10] then make buttons from the index
          const arr = Array.from({ length: 10 }, (_, i) => i + 1)
          self.children = arr
            .filter((i) => Hyprland.getWorkspace(i)?.windows > 0)
            .map((i) =>
              Widget.Button({
                onClicked: () => execAsync(`hyprctl dispatch workspace ${i}`),
                child: Widget.Label(`${i}`),
                className: Hyprland.active.workspace.id == i ? 'focused' : '',
              })
            )
        },
      ],
    ],
  })
}

const ClientTitle = () =>
  Widget.Label({
    className: 'client-title',
    binds: [['label', Hyprland.active.client, 'title']],
  })

const WorkspacesAndTitle = () =>
  Widget.Box({
    children: [Workspaces(), ClientTitle()],
  })

export default WorkspacesAndTitle
