import Widget from 'resource:///com/github/Aylur/ags/widget.js'
import icons from '../icons.js'
import Clock from '../misc/Clock.js'
import * as vars from '../variables.js'

/**
 * @param {'cpu' | 'ram' | 'temp'} type
 * @param {string} title
 * @param {string} unit
 */
const SysProgress = (type, title, unit) =>
  Widget.Box({
    class_name: `circular-progress-box ${type}`,
    hexpand: true,
    binds: [
      [
        'tooltipText',
        vars[type],
        'value',
        (v) => `${title}: ${Math.floor(v * 100)}${unit}`,
      ],
    ],
    child: Widget.CircularProgress({
      hexpand: true,
      class_name: `circular-progress ${type}`,
      child: Widget.Icon(icons.system[type]),
      start_at: 0.75,
      binds: [
        ['value', vars[type]],
        ['rounded', 30, 'value', (v) => v > 0],
      ],
    }),
  })

export default () =>
  Widget.Box({
    vertical: true,
    class_name: 'datemenu vertical',
    children: [
      Widget.Box({
        class_name: 'date-box',
        vertical: true,
        children: [Clock({ format: '%Y-%m-%d' })],
      }),
      Widget.Box({
        class_name: 'calendar',
        children: [
          Widget.Calendar({
            hexpand: true,
            hpack: 'center',
          }),
        ],
      }),
    ],
  })
