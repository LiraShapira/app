import * as React from "react"
import Svg, { SvgProps, Path, G, Defs, ClipPath } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={52}
    height={52}
    fill="none"
    {...props}
  >
    <Path
      stroke="#B04141"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.278}
      d="m18.223 31.224 9.07-6.887"
    />
    <G clipPath="url(#a)">
      <Path
        fill="#E69898"
        d="M6.415 21.847a1.138 1.138 0 0 0-.257 1.987l10.2 7.327 10.3-7.82a1.14 1.14 0 0 1 1.377 1.815l-10.3 7.82 4.317 11.793a1.14 1.14 0 0 0 1.984.287A91.901 91.901 0 0 0 38.092 17.25a1.14 1.14 0 0 0-1.118-1.473 91.897 91.897 0 0 0-30.56 6.069Z"
      />
    </G>
    <Path
      stroke="#B04141"
      strokeLinecap="round"
      strokeWidth={2.278}
      d="M11.418 33.503 3.037 38.62M14.143 37.527l-3.43 2.11"
    />
    <Defs>
      <ClipPath id="a">
        <Path
          fill="#fff"
          d="M0 22.133 29.026.095l22.038 29.026L22.038 51.16z"
        />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgComponent
