import * as React from "react"
import Svg, { SvgProps, G, Rect, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={95}
    height={95}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Rect
        width={71}
        height={71}
        x={83}
        y={79}
        fill="#BBE698"
        rx={35.5}
        shapeRendering="crispEdges"
        transform="rotate(-180 83 79)"
      />
    </G>
    <Path
      stroke="#6CB041"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="m73.5 30.535 8 2.428m0 0c-2.118-6.222-3.962-9.247-8.261-13.885A35.621 35.621 0 0 0 57.237 9.76a35.4 35.4 0 0 0-18.476.002 35.621 35.621 0 0 0-16 9.318 36.066 36.066 0 0 0-9.236 16.14M81.5 32.962s1.133-4.77 2.5-9.428m-72 40 2.5-9.43m0 0 8 2.93m-8-2.93c2.077 5.738 3.71 8.827 8.257 13.888a35.62 35.62 0 0 0 16.001 9.316 35.4 35.4 0 0 0 18.477-.001 35.62 35.62 0 0 0 16-9.32 36.066 36.066 0 0 0 9.236-16.138"
    />
    <Path
      stroke="#6CB041"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={5}
      d="m39.666 45.667 8.667 8 11.334-18"
    />
    <Defs></Defs>
  </Svg>
)
export default SvgComponent
