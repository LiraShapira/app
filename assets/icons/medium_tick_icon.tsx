import * as React from "react"
import Svg, { SvgProps, G, Rect, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={66}
    height={66}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Rect
        width={41.417}
        height={41.417}
        x={53.416}
        y={49.418}
        fill="#BBE698"
        rx={20.708}
        shapeRendering="crispEdges"
        transform="rotate(-180 53.416 49.418)"
      />
    </G>
    <Path
      stroke="#6CB041"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="m47.874 21.147 4.667 1.416m0 0c-1.235-3.63-2.311-5.394-4.819-8.1a20.779 20.779 0 0 0-9.334-5.434 20.65 20.65 0 0 0-10.778 0 20.78 20.78 0 0 0-9.334 5.437 21.038 21.038 0 0 0-5.387 9.414m39.652-1.317s.661-2.782 1.459-5.5M12 40.398l1.458-5.5m0 0 4.667 1.708m-4.667-1.709c1.211 3.347 2.164 5.149 4.816 8.101a20.78 20.78 0 0 0 9.335 5.435c3.53.953 7.247.953 10.778-.001a20.78 20.78 0 0 0 9.333-5.436 21.038 21.038 0 0 0 5.387-9.415"
    />
    <Path
      stroke="#6CB041"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="m28.138 29.973 5.056 4.667 6.61-10.5"
    />
    <Defs></Defs>
  </Svg>
)
export default SvgComponent
