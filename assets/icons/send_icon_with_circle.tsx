import * as React from "react"
import Svg, { SvgProps, G, Rect, Path, Defs, ClipPath } from "react-native-svg"
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
      stroke="#B04141"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.278}
      d="m45.223 45.224 9.07-6.887"
    />
    <G clipPath="url(#b)">
      <Path
        fill="#E69898"
        d="M33.414 35.847a1.138 1.138 0 0 0-.256 1.987l10.2 7.327 10.3-7.82a1.14 1.14 0 0 1 1.377 1.815l-10.3 7.82 4.318 11.793a1.14 1.14 0 0 0 1.983.287A91.901 91.901 0 0 0 65.092 31.25a1.14 1.14 0 0 0-1.118-1.473 91.898 91.898 0 0 0-30.56 6.069Z"
      />
    </G>
    <Path
      stroke="#B04141"
      strokeLinecap="round"
      strokeWidth={2.278}
      d="m38.418 47.503-8.381 5.117M41.143 51.527l-3.43 2.11"
    />
    <Defs>
      <ClipPath id="b">
        <Path
          fill="#fff"
          d="m27 36.133 29.026-22.038 22.038 29.026L49.038 65.16z"
        />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgComponent
