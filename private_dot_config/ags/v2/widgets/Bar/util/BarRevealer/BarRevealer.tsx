import Gtk from 'gi://Gtk?version=4.0'
import { createState, With } from 'ags'

interface BarRevealerProps {
  label: string | JSX.Element
  labelOpen?: string | JSX.Element
  class?: string
  children: JSX.Element
  transitionType?: any
  visible?: boolean | any
}

const { SLIDE_LEFT, SLIDE_RIGHT } = Gtk.RevealerTransitionType

const BarRevealer = ({
  children,
  label,
  labelOpen,
  class: className = '',
  visible = true,
  transitionType = SLIDE_RIGHT,
}: BarRevealerProps) => {
  const [open, setOpen] = createState(false)

  function onToggle() {
    setOpen((isOpen) => !isOpen)
  }

  const revealerButton = (
    <button onClicked={onToggle}>{open ? labelOpen ?? label : label}</button>
  )

  return (
    <box class={className} visible={visible}>
      {transitionType === SLIDE_LEFT && revealerButton}
      <revealer revealChild={open} transitionType={transitionType}>
        {children}
      </revealer>
      {transitionType === SLIDE_RIGHT && revealerButton}
    </box>
  )
}

export { BarRevealer }
