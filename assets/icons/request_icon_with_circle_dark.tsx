import * as React from "react"
import Svg, { G, Rect, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props) {
  return (
    <Svg
      width={95}
      height={96}
      viewBox="0 0 95 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G filter="url(#filter0_d_951_3107)">
        <Rect
          x={83}
          y={79.4648}
          width={71}
          height={71}
          rx={35.5}
          transform="rotate(-180 83 79.465)"
          fill="#201F23"
          shapeRendering="crispEdges"
        />
      </G>
      <Defs></Defs>
    </Svg>
  )
}

export default SvgComponent
