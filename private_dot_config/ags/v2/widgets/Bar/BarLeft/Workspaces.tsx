import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import Hyprland from "gi://AstalHyprland";

const Workspaces = () => {
  const hypr = Hyprland.get_default();

  return (
    <box className="workspaces" valign={Gtk.Align.CENTER}>
      {bind(hypr, "workspaces").as((wss) =>
        wss
          .filter((ws) => ws.id > 0)
          .sort((a, b) => a.id - b.id)
          .map((ws) => (
            <button
              className={bind(hypr, "focusedWorkspace").as((fw) =>
                ws === fw ? "workspace is-focused" : "workspace",
              )}
              onClicked={() => ws.focus()}
            >
              {ws.id}
            </button>
          )),
      )}
    </box>
  );
};

export { Workspaces };
