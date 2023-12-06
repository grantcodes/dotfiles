import Widget from 'resource:///com/github/Aylur/ags/widget.js'

/** @param {import('types/widgets/box').BoxProps=} props */
export default (props) =>
  Widget.Box({
    ...props,
    class_name: 'avatar',
    css: `
        background-image: url(https://backend.grant.codes/background/me.jpg);
        background-size: cover;
    `,
    connections: [
      [
        'draw',
        (box) => {
          const h = box.get_allocated_height()
          box.set_size_request(h, -1)
        },
      ],
    ],
  })
