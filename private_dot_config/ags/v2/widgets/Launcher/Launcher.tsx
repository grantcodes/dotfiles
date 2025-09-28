// AGS v3 migration (imports fallback for linter)
import Apps from 'gi://AstalApps'
import { createState } from 'ags'
import { execAsync } from 'ags/process'
import Gtk from 'gi://Gtk?version=4.0'
import app from 'ags/gtk4/app'
import Astal from 'gi://Astal?version=4.0'
import { LauncherItem } from './LauncherItem'

const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor
const MAX_ITEMS = 8

const [launcherVisible, setLauncherVisible] = createState(false)

const hide = () => setLauncherVisible(false)

function AppButton({ app }: { app: any }) {
  return (
    <Gtk.Button
      class="AppButton"
      onClicked={() => {
        hide()
        app.launch()
      }}
    >
      <box>
        <Gtk.Image icon_name={app.iconName} />
        <box valign={Gtk.Align.CENTER} orientation={Gtk.Orientation.VERTICAL}>
          <label class="name" truncate xalign={0} label={app.name} />
          {app.description && (
            <label
              class="description"
              wrap
              xalign={0}
              label={app.description}
            />
          )}
        </box>
      </box>
    </Gtk.Button>
  )
}

// TODO: App switching
// TODO: Math functionality
// TODO: Emoji picker
// TODO: Paste history

const Launcher = (monitor: any) => {
  const apps = new Apps.Apps()

  const [text, setText] = createState('')
  const list = () => apps.fuzzy_query(text).slice(0, MAX_ITEMS)
  const onEnter = () => {
    apps.fuzzy_query(text)?.[0].launch()
    hide()
  }

  // TODO: Get this math functionality working
  const mathResult = () => {
    try {
      const mathText = text.replace(/[^-()\d/*+.]/g, '')
      const result = eval(mathText)
      return result
    } catch (e) {
      return null
    }
  }

  return (
    <window
      class="Launcher"
      gdkmonitor={monitor}
      // anchor={TOP | BOTTOM | LEFT | RIGHT}
      visible={launcherVisible()}
      name="Launcher"
      exclusivity={Astal.Exclusivity.IGNORE}
      keymode={Astal.Keymode.ON_DEMAND}
      application={app}
      onShow={() => setText('')}
      // onKeyPressEvent={function (self, event: Gdk.Event) {
      //   if (event.get_keyval()[1] === Gdk.KEY_Escape) hide()
      // }}
    >
      <box class="surface" widthRequest={400} heightRequest={500}>
        {/* <box widthRequest={400} expand onClicked={hide} /> */}
        <box hexpand={false} orientation={Gtk.Orientation.VERTICAL}>
          {/* <box heightRequest={100} onClicked={hide} /> */}
          <box
            widthRequest={300}
            class="Applauncher"
            orientation={Gtk.Orientation.VERTICAL}
          >
            <Gtk.Entry
              placeholderText="Search"
              text={text}
              onChanged={(self: { text: string }) => setText(self.text)}
              onActivate={onEnter}
            />
            {mathResult() ? (
              <LauncherItem
                title={mathResult()}
                onSelected={() => execAsync(`wl-copy ${mathResult()}`)}
              />
            ) : null}
            <box spacing={6} orientation={Gtk.Orientation.VERTICAL}>
              {list().map((app: any) => (
                <LauncherItem
                  title={app.name}
                  description={app.description}
                  icon={app.iconName}
                  onSelected={() => {
                    hide()
                    app.launch()
                  }}
                />
              ))}
            </box>
            <box
              halign={Gtk.Align.CENTER}
              class="not-found"
              orientation={Gtk.Orientation.VERTICAL}
              visible={list().length === 0 && !mathResult()}
            >
              <Gtk.Image icon_name="system-search-symbolic" />
              <label label="No match found" />
            </box>
          </box>
          {/* <box expand onClicked={hide} /> */}
        </box>
        {/* <box widthRequest={400} expand onClicked={hide} /> */}
      </box>
    </window>
  )
}

export { Launcher, launcherVisible }
