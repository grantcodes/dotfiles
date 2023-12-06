// importing
import Widget from 'resource:///com/github/Aylur/ags/widget.js'
import { exec, execAsync } from 'resource:///com/github/Aylur/ags/utils.js'

const format = '+%H:%M %Y-%m-%d'

const Clock = () =>
  Widget.Label({
    className: 'clock',
    connections: [
      // this is bad practice, since exec() will block the main event loop
      // in the case of a simple date its not really a problem
      [1000, (self) => (self.label = exec(`date "${format}"`))],

      // this is what you should do
      [
        1000,
        (self) =>
          execAsync(['date', format])
            .then((date) => (self.label = date))
            .catch(console.error),
      ],
    ],
  })

export default Clock
