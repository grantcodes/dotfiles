import { Gtk } from "astal/gtk3";

interface LauncherItemProps {
  icon?: string;
  title: string;
  description?: string;
  onSelected(): void;
}

const LauncherItem = ({
  icon,
  title,
  description,
  onSelected,
}: LauncherItemProps) => (
  <button className="AppButton" onClicked={onSelected}>
    <box>
      {icon && <icon icon={icon} />}
      <box valign={Gtk.Align.CENTER} vertical>
        <label className="name" truncate xalign={0} label={title} />
        {description && (
          <label className="description" wrap xalign={0} label={description} />
        )}
      </box>
    </box>
  </button>
);

export { LauncherItem };
