import Battery from 'resource:///com/github/Aylur/ags/service/battery.js'
import Widget from 'resource:///com/github/Aylur/ags/widget.js'

const BatteryLabel = () =>
  Widget.Box({
    className: 'battery',
    children: [
      Widget.Icon({
        connections: [
          [
            Battery,
            (self) => {
              self.icon = `battery-level-${
                Math.floor(Battery.percent / 10) * 10
              }-symbolic`
            },
          ],
        ],
      }),
      Widget.Revealer({
        reveal_child: false,
        transition_duration: 1000,
        transition: 'slide_right',
        child: Widget.ProgressBar({
          vpack: 'center',
          connections: [
            [
              Battery,
              (self) => {
                if (Battery.percent < 0) return

                self.fraction = Battery.percent / 100
              },
            ],
          ],
        }),
        connections: [
          // [
          //   2000,
          //   (self) => {
          //     self.reveal_child = !self.reveal_child
          //   },
          // ],
        ],
      }),
    ],
  })

export default BatteryLabel
