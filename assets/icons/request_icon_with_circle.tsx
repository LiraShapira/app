import * as React from "react"
import Svg, { SvgProps, G, Rect, Path, Circle, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={95}
    height={96}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Rect
        width={71}
        height={71}
        x={83}
        y={79.465}
        fill="#fff"
        rx={35.5}
        shapeRendering="crispEdges"
        transform="rotate(-180 83 79.465)"
      />
    </G>
    <Path
      fill="#71D8DF"
      d="M67.459 46.732c.91 1.426.646 3.43-.59 4.479l-8.792 7.476c-1.625 1.378-3.584 2.123-5.605 2.123H30.223c-1.23 0-2.223-1.145-2.223-2.564v-5.128c0-1.418.993-2.564 2.222-2.564h2.556l3.118-2.885c1.576-1.458 3.535-2.243 5.556-2.243h10.993c1.229 0 2.222 1.146 2.222 2.564 0 1.418-.993 2.564-2.222 2.564H46.89c-.612 0-1.112.577-1.112 1.282 0 .705.5 1.282 1.111 1.282h6.113c1.46 0 2.873-.52 3.986-1.465l6.589-5.602c1.236-1.05 2.972-.745 3.882.68Z"
    />
    <Rect
      width={21.538}
      height={12.308}
      x={46.461}
      y={28.503}
      fill="#71D8DF"
      rx={1.538}
    />
    <Circle
      cx={57.231}
      cy={34.657}
      r={3.077}
      stroke="#4195B0"
      strokeWidth={1.538}
    />
    <Path
      stroke="#4195B0"
      strokeLinecap="round"
      strokeWidth={1.538}
      d="M51.077 30.041c-.244 1.883-.995 2.499-3.077 3.077M63.385 30.041c.244 1.883.995 2.499 3.076 3.077M48 36.196c1.883.244 2.499.995 3.077 3.077M66.461 36.196c-1.883.244-2.498.995-3.076 3.077"
    />
    <Path
      stroke="#4195B0"
      strokeLinecap="round"
      strokeWidth={2}
      d="M29 51.465v9"
    />
    <Defs></Defs>
  </Svg>
)
export default SvgComponent
