import * as React from "react"
import Svg, { SvgProps, G, Rect, Path, Defs, ClipPath } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={29}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Rect
        width={19.722}
        height={19.722}
        x={24.722}
        y={22.723}
        fill="#D2EEBB"
        rx={9.861}
        shapeRendering="crispEdges"
        transform="rotate(-180 24.722 22.723)"
      />
    </G>
    <Path
      stroke="#6CB041"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.083}
      d="M24.306 9.934c-.589-1.728-1.1-2.569-2.295-3.857a9.895 9.895 0 0 0-4.445-2.588 9.833 9.833 0 0 0-5.132 0 9.895 9.895 0 0 0-4.445 2.589 10.018 10.018 0 0 0-2.565 4.483m.27 5.246c.577 1.594 1.031 2.452 2.294 3.857a9.895 9.895 0 0 0 4.445 2.588 9.833 9.833 0 0 0 5.133 0 9.894 9.894 0 0 0 4.444-2.589 10.018 10.018 0 0 0 2.565-4.483"
    />
    <G clipPath="url(#b)">
      <Path
        stroke="#6CB041"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.806}
        d="m12.685 13.464 2.407 2.223 3.149-5"
      />
    </G>
    <Defs>
      <ClipPath id="b">
        <Path fill="#fff" d="M10.834 8.834h8.889v8.889h-8.89z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgComponent
