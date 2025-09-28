import Gtk from 'gi://Gtk?version=4.0'
import Astal from 'gi://Astal?version=4.0'
import { For, onCleanup, createState } from 'ags'
import { Notification } from './Notification'
import Notifd from 'gi://AstalNotifd'
import GLib from 'gi://GLib?version=2.0'

const { TOP } = Astal.WindowAnchor

const Notifications = (gdkmonitor: any) => {
  const [notifications, setNotifications] = createState(
    new Array<Notifd.Notification>()
  )
  const timeouts = new Map<number, number>()

  const startAutoClose = (notification: Notifd.Notification) => {
    const existingTimeout = timeouts.get(notification.id)
    if (existingTimeout) {
      GLib.source_remove(existingTimeout)
    }

    const getTimeout = () => {
      switch (notification.urgency) {
        case Notifd.Urgency.LOW:
          return 3000
        case Notifd.Urgency.CRITICAL:
          return 0
        default:
          return 5000
      }
    }

    const timeout = getTimeout()
    if (timeout > 0) {
      const timeoutId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, timeout, () => {
        notification.dismiss()
        timeouts.delete(notification.id)
        return false
      })
      timeouts.set(notification.id, timeoutId)
    }
  }

  const notifd = Notifd.get_default()

  const notifiedHandler = (_, id, replaced) => {
    const notification = notifd.get_notification(id)

    if (replaced && notifications.get().some((n) => n.id === id)) {
      setNotifications((ns) => ns.map((n) => (n.id === id ? notification : n)))
    } else {
      setNotifications((ns) => [notification, ...ns])
    }
    startAutoClose(notification)
  }

  const resolvedHandler = (_, id) => {
    const timeoutId = timeouts.get(id)
    if (timeoutId) {
      GLib.source_remove(timeoutId)
      timeouts.delete(id)
    }
    setNotifications((ns) => ns.filter((n) => n.id !== id))
  }

  notifd.connect('notified', notifiedHandler)
  notifd.connect('resolved', resolvedHandler)

  onCleanup(() => {
    timeouts.forEach((timeoutId) => GLib.source_remove(timeoutId))
    timeouts.clear()

    notifd.disconnect(notifiedHandler)
    notifd.disconnect(resolvedHandler)
  })

  return (
    <window
      class="Notifications"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={TOP}
      marginTop={42}
      visible={notifications((ns) => ns.length > 0)}
      $={(self) => onCleanup(() => self.destroy())}
    >
      <box orientation={Gtk.Orientation.VERTICAL} spacing={8}>
        <For each={notifications}>
          {(notification) => <Notification notification={notification} />}
        </For>
      </box>
    </window>
  )
}

export { Notifications }
