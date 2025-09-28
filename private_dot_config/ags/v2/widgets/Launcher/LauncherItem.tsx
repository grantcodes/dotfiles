import Gtk from 'gi://Gtk?version=4.0'

interface LauncherItemProps {
  icon?: string
  title: string
  description?: string
  onSelected(): void
}

const LauncherItem = ({
  icon,
  title,
  description,
  onSelected,
}: LauncherItemProps) => (
  <Gtk.Button class="AppButton" onClicked={onSelected}>
    <box>
      {icon && <Gtk.Image icon_name={icon} />}
      <box valign={Gtk.Align.CENTER} orientation={Gtk.Orientation.VERTICAL}>
        <label class="name" truncate xalign={0} label={title} />
        {description && (
          <label class="description" wrap xalign={0} label={description} />
        )}
      </box>
    </box>
  </Gtk.Button>
)

export { LauncherItem }
