import { bind, Variable } from "astal";
import Hyprland from "gi://AstalHyprland";
import { Astal, Gtk } from "astal/gtk3";
import { truncateText } from "../../../lib/truncate-text";

const SUBSTITUTIONS = {
  icons: [
    ["transmission-gtk", "transmission"],
    ["blueberry.py", "bluetooth"],
    ["Caprine", "facebook-messenger"],
    ["", "preferences-desktop-display"],
    ["vivaldi-stable", "web-browser"],
  ],
  titles: [
    ["com.github.Aylur.ags", "AGS"],
    ["transmission-gtk", "Transmission"],
    ["com.obsproject.Studio", "OBS"],
    ["com.usebottles.bottles", "Bottles"],
    ["com.github.wwmm.easyeffects", "Easy Effects"],
    ["org.gnome.TextEditor", "Text Editor"],
    ["org.gnome.design.IconLibrary", "Icon Library"],
    ["blueberry.py", "Blueberry"],
    ["org.wezfurlong.wezterm", "Wezterm"],
    ["com.raggesilver.BlackBox", "BlackBox"],
    ["firefox", "Firefox"],
    ["thunderbird", "Thunderbird"],
    ["org.gnome.Nautilus", "Files"],
    ["libreoffice-writer", "Writer"],
    ["", "Desktop"],
    ["code-oss", "VS Code"],
    ["code", "VS Code"],
    ["vivaldi-stable", "Vivaldi"],
    ["nemo", "Files"],
  ],
};

const FocusedClient = () => {
  const hypr = Hyprland.get_default();
  const focused = bind(hypr, "focusedClient");

  const label: Variable<string> = Variable.derive([focused], (focused) => {
    const c = focused.class;
    const sub = SUBSTITUTIONS.titles.find(([k]) => k === c);
    return truncateText(sub ? sub[1] : focused.title);
  });
  // TODO: Icon is not rendering
  const icon: Variable<string> = Variable.derive([focused], (focused) => {
    const iconName = focused.class.toLowerCase() + "-symbolic";
    return Astal.Icon.lookup_icon(iconName)?.get_filename() ?? "";
  });

  return (
    <box
      className="focused-client"
      visible={focused.as(Boolean)}
      widthRequest={30}
    >
      {!!bind(icon) && (
        <icon className="focused-client__icon" icon={bind(icon)} />
      )}
      <label label={bind(label)} maxWidthChars={20} widthRequest={30} />
    </box>
  );
};

export { FocusedClient };
