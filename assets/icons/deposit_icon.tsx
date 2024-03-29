import * as React from "react"
import Svg, { SvgProps, G, Rect, Path, Defs } from "react-native-svg"
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
        fill="#BBE698"
        rx={35.5}
        shapeRendering="crispEdges"
        transform="rotate(-180 83 79.465)"
      />
    </G>
    <Path
      stroke="#6CB041"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="m73.5 31 8 2.428m0 0c-2.118-6.222-3.962-9.247-8.261-13.885a35.623 35.623 0 0 0-16.002-9.317 35.4 35.4 0 0 0-18.476.001 35.622 35.622 0 0 0-16 9.32 36.066 36.066 0 0 0-9.236 16.138M81.5 33.428S82.633 28.658 84 24M12 64l2.5-9.43m0 0 8 2.93m-8-2.93c2.077 5.738 3.71 8.827 8.257 13.887a35.622 35.622 0 0 0 16.001 9.317 35.4 35.4 0 0 0 18.477-.001 35.622 35.622 0 0 0 16-9.32 36.066 36.066 0 0 0 9.236-16.138"
    />
    <Path
      stroke="#6CB041"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M46.28 59.69c3.264-1.088 4.352-3.264 4.343-7.72"
    />
    <Path fill="#BBE699" d="M47 52.5h3.5L57 50l-1-11.5H41.5l-1 11 6.5 3Z" />
    <Path
      fill="#6CB041"
      fillRule="evenodd"
      d="M48.213 31.033c-1.132.858-3.352 3.16-4.305 6.299-1.232-.583-2.123-.922-2.89-1.114-.951-.238-1.678-.238-2.52-.238h-.027a1.17 1.17 0 0 0-.804.311 1.4 1.4 0 0 0-.378.627c-.118.384-.118.842-.08 1.27.076.883.35 2.021.692 3.143a31.473 31.473 0 0 0 1.186 3.243c.137.314.273.608.406.873-1.129.297-2.527 1.078-3.461 2.949a.876.876 0 0 0-.067.588c.026.113.068.204.1.263.063.12.147.231.226.325.164.195.395.418.68.649.575.466 1.424 1.01 2.521 1.47 2.078.872 5.053 1.44 8.756.593v-3.563l-4.172 1.192a.75.75 0 1 1-.412-1.442l3.632-1.038-3.862-2.758a.75.75 0 1 1 .872-1.22l3.942 2.815v-5.623a.75.75 0 1 1 1.5 0v5.623l3.941-2.816a.75.75 0 0 1 .872 1.22l-3.862 2.76 3.632 1.037a.75.75 0 0 1-.412 1.442l-4.171-1.191V52.4c3.45.674 6.236.12 8.211-.709 1.098-.46 1.946-1.005 2.52-1.47.286-.231.517-.454.681-.649.08-.094.163-.205.227-.325.03-.059.074-.15.1-.263a.876.876 0 0 0-.067-.589c-.928-1.856-2.327-2.65-3.46-2.949.06-.12.12-.244.18-.372a29.59 29.59 0 0 0 1.281-3.328c.383-1.194.7-2.43.805-3.392.052-.466.064-.955-.042-1.36a1.46 1.46 0 0 0-.362-.667 1.17 1.17 0 0 0-.842-.347h-.026c-.843 0-1.57 0-2.522.238-.766.192-1.657.53-2.888 1.114-.953-3.14-3.174-5.441-4.306-6.299a.812.812 0 0 0-.785-.134.813.813 0 0 0-.24.134Z"
      clipRule="evenodd"
    />
    <Defs></Defs>
  </Svg>
)
export default SvgComponent
