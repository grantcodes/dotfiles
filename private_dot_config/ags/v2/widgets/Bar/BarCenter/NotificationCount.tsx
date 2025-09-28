import { createBinding } from 'ags'
import Gtk from 'gi://Gtk?version=4.0'
// import { BarRevealer } from "../util/BarRevealer";
import { hasNotifications, notificationCount } from '../../Notifications'
import { notificationCenterWindow } from '../../NotificationCenter'

const NotificationCount = () => {
  return (
    <box
      class="notification-count"
      visible={createBinding(hasNotifications).as(Boolean)}
    >
      <Gtk.Button
        onClicked={() => {
          notificationCenterWindow.visible = !notificationCenterWindow.visible
        }}
      >
        <box>
          <label
            class="notification-count__number"
            label={createBinding(notificationCount).as(
              (count: number) => `${count}`
            )}
          />
          <Gtk.Image
            class="notification-count__icon"
            icon_name="notification-inactive"
          />
        </box>
      </Gtk.Button>
    </box>
  )
}

export { NotificationCount }
