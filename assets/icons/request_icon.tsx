import * as React from "react"
import Svg, { SvgProps, Path, Rect, Circle } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={34}
    fill="none"
    {...props}
  >
    <Path
      fill="#71D8DF"
      d="M39.459 18.732c.91 1.426.646 3.43-.59 4.479l-8.792 7.476c-1.625 1.378-3.584 2.123-5.605 2.123H2.224C.992 32.81 0 31.665 0 30.246v-5.128c0-1.418.993-2.564 2.222-2.564h2.556l3.118-2.885c1.576-1.458 3.535-2.243 5.555-2.243h10.994c1.229 0 2.222 1.146 2.222 2.564 0 1.418-.993 2.564-2.222 2.564H18.89c-.612 0-1.112.577-1.112 1.282 0 .705.5 1.282 1.111 1.282h6.113c1.46 0 2.873-.52 3.986-1.465l6.589-5.602c1.236-1.05 2.972-.745 3.882.68Z"
    />
    <Rect
      width={21.538}
      height={12.308}
      x={18.461}
      y={0.503}
      fill="#71D8DF"
      rx={1.538}
    />
    <Circle
      cx={29.231}
      cy={6.657}
      r={3.077}
      stroke="#4195B0"
      strokeWidth={1.538}
    />
    <Path
      stroke="#4195B0"
      strokeLinecap="round"
      strokeWidth={1.538}
      d="M23.077 2.041C22.833 3.924 22.08 4.54 20 5.118M35.385 2.041c.244 1.883.995 2.499 3.076 3.077M20 8.196c1.883.244 2.499.995 3.077 3.077M38.461 8.196c-1.883.244-2.498.995-3.076 3.077"
    />
    <Path
      stroke="#4195B0"
      strokeLinecap="round"
      strokeWidth={2}
      d="M1 23.465v9"
    />
  </Svg>
)
export default SvgComponent
