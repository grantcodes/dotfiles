import Gtk from 'gi://Gtk?version=4.0'

interface NotificationActionsProps {
  notification: any
}

const { CENTER } = Gtk.Align

const NotificationActions = ({ notification: n }: NotificationActionsProps) => (
  <>
    {n.get_actions().length > 0 && (
      <box class="notification-actions">
        {n.get_actions().map(({ label, id }: { label: string; id: string }) => (
          <Gtk.Button
            hexpand
            onClicked={() => n.invoke(id)}
            class="notification-actions__button"
          >
            <label label={label} halign={CENTER} hexpand />
          </Gtk.Button>
        ))}
      </box>
    )}
  </>
)

export { NotificationActions }
