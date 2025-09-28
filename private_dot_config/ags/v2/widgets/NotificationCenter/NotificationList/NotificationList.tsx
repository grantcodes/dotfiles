import Gtk from 'gi://Gtk?version=4.0'
import { NotificationListNoNotifications } from './NotificatonListNoNotifications'
import { For, onCleanup, createState, createComputed } from 'ags'
import { Notification } from '../../Notifications/Notification'
import Notifd from 'gi://AstalNotifd'

const { START } = Gtk.Align
const { VERTICAL } = Gtk.Orientation

const NotificationList = () => {
  const [notifications, setNotifications] = createState(
    new Array<Notifd.Notification>()
  )

  const notifd = Notifd.get_default()

  const notifiedHandler = (_, id, replaced) => {
    const notification = notifd.get_notification(id)

    if (replaced && notifications.get().some((n) => n.id === id)) {
      setNotifications((ns) => ns.map((n) => (n.id === id ? notification : n)))
    } else {
      setNotifications((ns) => [notification, ...ns])
    }
  }

  const resolvedHandler = (_, id) => {
    setNotifications((ns) => ns.filter((n) => n.id !== id))
  }

  notifd.connect('notified', notifiedHandler)
  notifd.connect('resolved', resolvedHandler)

  onCleanup(() => {
    notifd.disconnect(notifiedHandler)
    notifd.disconnect(resolvedHandler)
  })

  const count = notifications((ns) => ns.length).get()
  const hasNotifications = notifications((ns) => ns.length > 0)

  const clearAll = () => {
    for (const n of notifications) {
      notifications.get_notification(n.id).dismiss()
    }
  }

  return (
    <box class="notification-list" orientation={VERTICAL}>
      <centerbox class="notification-list__header" halign={START}>
        <label
          $type="start"
          label={count > 0 ? `Notifications (${count})` : 'Notifications'}
          // label={`Notifications (${notifications((ns) => ns.length)})`}
        />
        <button
          $type="end"
          class="clear-button"
          heightRequest={20}
          widthRequest={20}
          halign={Gtk.Align.END}
          onClicked={() => clearAll()}
          visible={hasNotifications}
        >
          <image icon_name="user-trash-symbolic" css="font-size: 14px;" />
        </button>
      </centerbox>

      <scrolledwindow
        name="notification-list-scrollable"
        maxContentHeight={550}
        valign={START}
        visible={hasNotifications}
      >
        <box
          class="notification-list-scrollable__inner"
          orientation={VERTICAL}
          spacing={8}
        >
          <For each={notifications}>
            {(notification) => <Notification notification={notification} />}
          </For>
        </box>{' '}
      </scrolledwindow>

      <box visible={!hasNotifications} vexpand hexpand>
        <NotificationListNoNotifications />
      </box>
    </box>
  )
}

export { NotificationList }
