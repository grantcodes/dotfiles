import App from 'resource:///com/github/Aylur/ags/app.js'
import PanelButton from '../PanelButton.js'
import FontIcon from '../../misc/FontIcon.js'

export default () =>
  PanelButton({
    class_name: 'overview',
    window: 'overview',
    on_clicked: () => App.toggleWindow('overview'),
    content: FontIcon({
      icon: '󰕰',
    }),
  })
