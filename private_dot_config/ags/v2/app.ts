import { App } from "astal/gtk3";
import {
  Bar,
  NotificationCenter,
  Notifications,
  ControlCenter,
  Assistant,
  Launcher,
  launcherVisible,
} from "./widgets";

App.start({
  css: "./styles/main.css",
  requestHandler(request: string, res: (response: any) => void) {
    switch (request) {
      case "reload-css": {
        res("Reloading CSS");
        App.reset_css();
        App.apply_css("./styles/main.css");
        break;
      }
      case "toggle-launcher": {
        res("Toggling Launcher");
        launcherVisible.set(!launcherVisible.get());
        break;
      }
      default: {
        res("unknown command");
      }
    }
  },
  main() {
    App.get_monitors().map(Bar);
    App.get_monitors().map(Notifications);
    App.get_monitors().map(NotificationCenter);
    App.get_monitors().map(ControlCenter);
    App.get_monitors().map(Assistant);
    App.get_monitors().map(Launcher);
  },
});
