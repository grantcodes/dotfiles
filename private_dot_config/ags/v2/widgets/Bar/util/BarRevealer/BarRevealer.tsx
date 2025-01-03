import { Gtk } from "astal/gtk3";
import { bind, type Binding, Variable } from "astal";

interface BarRevealerProps {
  label: string | JSX.Element;
  labelOpen?: string | JSX.Element;
  className?: string;
  child: JSX.Element;
  transitionType?: Gtk.RevealerTransitionType;
  visible?: boolean | Binding<boolean>;
}

const { SLIDE_LEFT, SLIDE_RIGHT } = Gtk.RevealerTransitionType;

const BarRevealer = ({
  child,
  label,
  labelOpen,
  className = "",
  visible = true,
  transitionType = SLIDE_RIGHT,
}: BarRevealerProps) => {
  const open = Variable<boolean>(false);
  const buttonLabel: Variable<string | JSX.Element> = Variable.derive(
    [open],
    (isOpen) => (isOpen ? (labelOpen ?? label) : label),
  );

  const revealerButton = (
    <button onClick={() => open.set(!open.get())}>{bind(buttonLabel)}</button>
  );

  // TODO: Button label if an icon can get destroyed and break when trying to change back
  return (
    <box className={className} visible={visible}>
      {transitionType === SLIDE_LEFT && revealerButton}
      <revealer revealChild={bind(open)} transitionType={transitionType}>
        {child}
      </revealer>
      {transitionType === SLIDE_RIGHT && revealerButton}
    </box>
  );
};

export { BarRevealer };
