import Notifd from "gi://AstalNotifd";
import { createState, createComputed } from "ags";

const getNotifications = () => {
	const [notifications, setNotifications] = createState(
		new Array<Notifd.Notification>(),
	);
	// const [hasNotifications, setHasNotifications] = createState(false);
	// const [notificationCount, setNotificationCount] = createState(0);

	const { notificationCount, hasNotifications } = createComputed(
		[notifications],
		(notifications: Notifd.Notification[]) => ({
			notificationCount: notifications?.length ?? 0,
			hasNotifications: notifications?.length > 0,
		}),
	);

	const notifd = Notifd.get_default();

	const notifiedHandler = (_, id, replaced) => {
		const notification = notifd.get_notification(id);

		if (replaced && notifications.get().some((n) => n.id === id)) {
			setNotifications((ns) => ns.map((n) => (n.id === id ? notification : n)));
		} else {
			setNotifications((ns) => [notification, ...ns]);
		}
	};

	const resolvedHandler = (_, id) => {
		setNotifications((ns) => ns.filter((n) => n.id !== id));
	};

	notifd.connect("notified", notifiedHandler);
	notifd.connect("resolved", resolvedHandler);

	const cleanup = () => {
		notifd.disconnect(notifiedHandler);
		notifd.disconnect(resolvedHandler);
	};

	return {
		hasNotifications,
		notificationCount,
		notifd,
		notifications,
		cleanup,
	};
};

const { hasNotifications, notificationCount, notifd, notifications, cleanup } =
	getNotifications();

export {
	hasNotifications,
	notificationCount,
	notifd,
	notifications,
	cleanup,
	getNotifications,
};
