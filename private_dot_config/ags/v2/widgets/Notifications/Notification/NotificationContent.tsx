import { GLib } from "astal";
import { Gtk, Astal } from "astal/gtk3";
import type Notifd from "gi://AstalNotifd";

const isIcon = (icon: string) => !!Astal.Icon.lookup_icon(icon);

const fileExists = (path: string) => GLib.file_test(path, GLib.FileTest.EXISTS);

interface NotificationContentProps {
  notification: Notifd.Notification;
}

const { START, CENTER } = Gtk.Align;

const NotificationContent = ({ notification: n }: NotificationContentProps) => (
  <box className="notification-content">
    {n.image && fileExists(n.image) && (
      <box
        valign={START}
        className="notification-content__image"
        css={`
                background-image: url('${n.image}');
              `}
      />
    )}
    {n.image && isIcon(n.image) && (
      <box expand={false} valign={START} className="icon-image">
        <icon icon={n.image} expand halign={CENTER} valign={CENTER} />
      </box>
    )}
    <box vertical>
      <label
        className="notification-content__summary"
        halign={START}
        xalign={0}
        label={n.summary}
        truncate
      />
      {n.body && (
        <label
          className="notification-content__body"
          wrap
          useMarkup
          halign={START}
          xalign={0}
          justifyFill
          label={n.body}
        />
      )}
    </box>
  </box>
);

export { NotificationContent };
