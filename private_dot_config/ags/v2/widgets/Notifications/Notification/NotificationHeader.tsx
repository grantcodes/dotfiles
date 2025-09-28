import GLib from 'gi://GLib'
import Gtk from 'gi://Gtk?version=4.0'
import Gdk from 'gi://Gdk?version=4.0'
import Pango from 'gi://Pango'

const time = (time: number, format = '%H:%M') =>
  GLib.DateTime.new_from_unix_local(time).format(format)!

interface NotificationHeaderProps {
  notification: any
}
const { START, END } = Gtk.Align

function isIcon(icon?: string | null) {
  const iconTheme = Gtk.IconTheme.get_for_display(Gdk.Display.get_default()!)
  return icon && iconTheme.has_icon(icon)
}

const NotificationHeader = ({ notification: n }: NotificationHeaderProps) => {
  return (
    <box class="notification-header">
      {(n.appIcon || isIcon(n.desktopEntry)) && (
        <image
          class="notification-header__app-icon"
          visible={Boolean(n.appIcon || n.desktopEntry)}
          iconName={n.appIcon || n.desktopEntry}
        />
      )}
      <label
        class="notification-header__app-name"
        halign={START}
        ellipsize={Pango.EllipsizeMode.END}
        label={n.appName || 'Unknown'}
      />
      <label
        class="notification-header__time"
        hexpand
        halign={END}
        label={time(n.time)}
      />
      <button class="notification-header__close" onClicked={() => n.dismiss()}>
        <image iconName="window-close-symbolic" />
      </button>
    </box>
  )
}

export { NotificationHeader }
