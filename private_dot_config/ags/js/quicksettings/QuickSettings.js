import Widget from 'resource:///com/github/Aylur/ags/widget.js'
import Header from './widgets/Header.js'
import PopupWindow from '../misc/PopupWindow.js'
import { Volume, Microhone, SinkSelector, AppMixer } from './widgets/Volume.js'
import Media from './widgets/Media.js'
import Brightness from './widgets/Brightness.js'

const Row = (toggles = [], menus = []) =>
  Widget.Box({
    vertical: true,
    children: [
      Widget.Box({
        class_name: 'row horizontal',
        children: toggles,
      }),
      ...menus,
    ],
  })

export default () =>
  PopupWindow({
    name: 'quicksettings',
    anchor: ['top', 'right'],
    transition: 'slide_down',
    child: Widget.Box({
      vertical: true,
      children: [
        Header(),
        Widget.Box({
          class_name: 'sliders-box vertical',
          vertical: true,
          children: [
            Row([Volume()], [SinkSelector(), AppMixer()]),
            Microhone(),
            Brightness(),
          ],
        }),
        Media(),
      ],
    }),
  })
