import Widget from 'resource:///com/github/Aylur/ags/widget.js'
import icons from '../../icons.js'
import PowerMenu from '../../services/powermenu.js'

export default () =>
  Widget.Box({
    class_name: 'header horizontal',
    children: [
      Widget.Box({
        class_name: 'system-box',
        vertical: true,
        hexpand: true,
        children: [
          Widget.Box({
            children: [
              Widget.Button({
                vpack: 'center',
                // on_clicked: () => ,
                child: Widget.Icon(icons.lock),
              }),
              Widget.Button({
                vpack: 'center',
                on_clicked: () => PowerMenu.action('shutdown'),
                child: Widget.Icon(icons.powermenu.shutdown),
              }),
            ],
          }),
        ],
      }),
    ],
  })
