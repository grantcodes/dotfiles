import { createBinding, For } from 'ags'
import Gtk from 'gi://Gtk?version=4.0'
import TrayService from 'gi://AstalTray'
import { BarRevealer } from '../util/BarRevealer'

const Tray = () => {
  const tray = TrayService.get_default()
  const items = createBinding(tray, 'items')

  const init = (btn: Gtk.MenuButton, item: TrayService.TrayItem) => {
    btn.menuModel = item.menuModel
    btn.insert_action_group('dbusmenu', item.actionGroup)
    item.connect('notify::action-group', () => {
      btn.insert_action_group('dbusmenu', item.actionGroup)
    })
  }

  return (
    <BarRevealer
      label={<image iconName="view-more" />}
      labelOpen={<image iconName="view-more" />}
    >
      <box spacing={4}>
        <For each={items}>
          {/* NOTE: For some reason this breaks if split to a separate component */}
          {(item) => (
            <menubutton
              $={(self) => init(self, item)}
              class="btn btn-neutral btn-ghost btn-icon"
            >
              <image gicon={createBinding(item, 'gicon')} />
            </menubutton>
          )}
        </For>
      </box>
    </BarRevealer>
  )
}

export { Tray }
