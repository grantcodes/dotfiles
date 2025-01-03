import { App } from "astal/gtk3";
import { bind } from "astal";
import { Gdk } from "astal/gtk3";
import AstralTray from "gi://AstalTray";
import { BarRevealer } from "../util/BarRevealer";

const TrayItems = () => {
  const tray = AstralTray.get_default();

  return (
    <box>
      {bind(tray, "items").as((items) =>
        items.map((item) => {
          if (item.iconThemePath) App.add_icons(item.iconThemePath);

          const menu = item.create_menu();

          return (
            <button
              tooltipMarkup={bind(item, "tooltipMarkup")}
              onDestroy={() => menu?.destroy()}
              onClickRelease={(self) => {
                menu?.popup_at_widget(
                  self,
                  Gdk.Gravity.SOUTH,
                  Gdk.Gravity.NORTH,
                  null,
                );
              }}
            >
              <icon gIcon={bind(item, "gicon")} />
            </button>
          );
        }),
      )}
    </box>
  );
};

const Tray = () => (
  <BarRevealer
    label={<icon icon="go-previous" />}
    labelOpen={<icon icon="go-next" />}
  >
    <TrayItems />
  </BarRevealer>
);

export { Tray };
