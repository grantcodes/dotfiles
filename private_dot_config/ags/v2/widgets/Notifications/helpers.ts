import Notifd from "gi://AstalNotifd";
import { Variable } from "astal";

const hasNotifications = Variable<boolean>(false);
const notificationCount = Variable<number>(0);

const notifications = Notifd.get_default();

const setVariables = () => {
  hasNotifications.set(notifications.get_notifications().length > 0);
  notificationCount.set(notifications.get_notifications().length);
};

notifications.connect("notified", setVariables);
notifications.connect("resolved", setVariables);
// notifications.connect("cleared", setVariables);

export { hasNotifications, notificationCount };
