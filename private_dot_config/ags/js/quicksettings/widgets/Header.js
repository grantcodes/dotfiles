import Widget from 'resource:///com/github/Aylur/ags/widget.js'
import Battery from 'resource:///com/github/Aylur/ags/service/battery.js'
import icons from '../../icons.js'
import PowerMenu from '../../services/powermenu.js'

export const BatteryProgress = () =>
  Widget.Box({
    class_name: 'battery-progress',
    vexpand: true,
    binds: [['visible', Battery, 'available']],
    connections: [
      [
        Battery,
        (w) => {
          w.toggleClassName('charging', Battery.charging || Battery.charged)
          w.toggleClassName('medium', Battery.percent < 30)
          w.toggleClassName('low', Battery.percent < 15)
          w.toggleClassName('half', Battery.percent < 48)
        },
      ],
    ],
    child: Widget.Overlay({
      vexpand: true,
      child: Widget.ProgressBar({
        hexpand: true,
        vexpand: true,
        connections: [
          [
            Battery,
            (progress) => {
              progress.fraction = Battery.percent / 100
            },
          ],
        ],
      }),
      overlays: [
        Widget.Label({
          connections: [
            [
              Battery,
              (l) => {
                l.label =
                  Battery.charging || Battery.charged
                    ? icons.battery.charging
                    : `${Battery.percent}%`
              },
            ],
          ],
        }),
      ],
    }),
  })

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
          BatteryProgress(),
        ],
      }),
    ],
  })