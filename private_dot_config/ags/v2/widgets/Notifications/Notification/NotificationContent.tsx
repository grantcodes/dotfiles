import { GLib } from 'astal'
import Gtk from 'gi://Gtk?version=4.0'
import Astal from 'gi://Astal?version=4.0'
import type Notifd from 'gi://AstalNotifd'
import Pango from 'gi://Pango'

const isIcon = (icon: string) => !!Astal.Icon.lookup_icon(icon)

const fileExists = (path: string) => GLib.file_test(path, GLib.FileTest.EXISTS)

interface NotificationContentProps {
  notification: Notifd.Notification
}

const { START, CENTER } = Gtk.Align

const NotificationContent = ({ notification: n }: NotificationContentProps) => (
  <box cssClasses={['notification-content']}>
    {n.image && fileExists(n.image) && (
      <box
        valign={START}
        cssClasses={['notification-content__image']}
        css={`
          background-image: url('${n.image}');
        `}
      />
    )}
    {n.image && isIcon(n.image) && (
      <box expand={false} valign={START} cssClasses={['icon-image']}>
        <image icon_name={n.image} expand halign={CENTER} valign={CENTER} />
      </box>
    )}
    <box orientation={Gtk.Orientation.VERTICAL}>
      <label
        cssClasses={['notification-content__summary']}
        halign={START}
        xalign={0}
        label={n.summary}
        ellipsize={Pango.EllipsizeMode.END}
      />
      {n.body && (
        <label
          cssClasses={['notification-content__body']}
          wrap
          useMarkup
          halign={START}
          xalign={0}
          // justifyFill
          label={n.body}
        />
      )}
    </box>
  </box>
)

export { NotificationContent }
