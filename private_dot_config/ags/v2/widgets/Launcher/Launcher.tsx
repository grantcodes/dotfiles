import Apps from "gi://AstalApps";
import { Variable, bind, execAsync } from "astal";
import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import { LauncherItem } from "./LauncherItem";

const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor;
const MAX_ITEMS = 8;

const launcherVisible = Variable<boolean>(false);

const hide = () => launcherVisible.set(false);

function AppButton({ app }: { app: Apps.Application }) {
  return (
    <button
      className="AppButton"
      onClicked={() => {
        hide();
        app.launch();
      }}
    >
      <box>
        <icon icon={app.iconName} />
        <box valign={Gtk.Align.CENTER} vertical>
          <label className="name" truncate xalign={0} label={app.name} />
          {app.description && (
            <label
              className="description"
              wrap
              xalign={0}
              label={app.description}
            />
          )}
        </box>
      </box>
    </button>
  );
}

// TODO: App switching
// TODO: Math functionality
// TODO: Emoji picker
// TODO: Paste history

const Launcher = (monitor: Gdk.Monitor) => {
  const apps = new Apps.Apps();

  const text = Variable("");
  const list = text((text) => apps.fuzzy_query(text).slice(0, MAX_ITEMS));
  const onEnter = () => {
    apps.fuzzy_query(text.get())?.[0].launch();
    hide();
  };

  // TODO: Get this math functionality working
  const mathResult = text((text) => {
    try {
      const mathText = text.replace(/[^-()\d/*+.]/g, "");
      const result = eval(mathText);
      return result;
    } catch (e) {
      return null;
    }
  });

  return (
    <window
      className="Launcher"
      gdkmonitor={monitor}
      // anchor={TOP | BOTTOM | LEFT | RIGHT}
      visible={bind(launcherVisible)}
      name="Launcher"
      exclusivity={Astal.Exclusivity.IGNORE}
      keymode={Astal.Keymode.ON_DEMAND}
      application={App}
      onShow={() => text.set("")}
      onKeyPressEvent={function (self, event: Gdk.Event) {
        if (event.get_keyval()[1] === Gdk.KEY_Escape) hide();
      }}
    >
      <box className="surface" widthRequest={400} heightRequest={500}>
        <eventbox widthRequest={400} expand onClick={hide} />
        <box hexpand={false} vertical>
          <eventbox heightRequest={100} onClick={hide} />
          <box widthRequest={300} className="Applauncher" vertical>
            <entry
              placeholderText="Search"
              text={text()}
              onChanged={(self) => text.set(self.text)}
              onActivate={onEnter}
            />
	    {bind(mathResult).as(r => r ?  <LauncherItem title={r} onSelected={() => execAsync(`wl-copy ${r}`)} /> : null)}
            <box spacing={6} vertical>
              {list.as((list) =>
                list.map((app) => (
                  <LauncherItem
                    title={app.name}
                    description={app.description}
                    icon={app.iconName}
                    onSelected={() => {
                      hide();
                      app.launch();
                    }}
                  />
                )),
              )}
            </box>
            <box
              halign={Gtk.Align.CENTER}
              className="not-found"
              vertical
              visible={
                list.as((l) => l.length === 0) && mathResult.as((m) => !m)
              }
            >
              <icon icon="system-search-symbolic" />
              <label label="No match found" />
            </box>
          </box>
          <eventbox expand onClick={hide} />
        </box>
        <eventbox widthRequest={400} expand onClick={hide} />
      </box>
    </window>
  );
};

export { Launcher, launcherVisible };
