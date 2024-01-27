import App from 'resource:///com/github/Aylur/ags/app.js'
import PanelButton from '../PanelButton.js'
import FontIcon from '../../misc/FontIcon.js'

export default () =>
  PanelButton({
    class_name: 'quicksettings panel-button',
    onClicked: () => App.toggleWindow('quicksettings'),
    content: FontIcon({
      icon: '󰒓',
    }),
  })
