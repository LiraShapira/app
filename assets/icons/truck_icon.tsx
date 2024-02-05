import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={52}
    height={38}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#E0C5D1"
        d="M4.729 25.222h29.95v4.517a1 1 0 0 1-1 1H4.73v-5.517Z"
      />
      <Path
        fill="#E0C5D1"
        fillRule="evenodd"
        d="M35.468 10.05a2.956 2.956 0 0 0-2.956-2.956H19.507a2.956 2.956 0 0 0-2.956 2.955v11.232h18.917V10.049Z"
        clipRule="evenodd"
      />
      <Path
        fill="#E0C5D1"
        d="M16.551 23.646h18.917v4.137a2.957 2.957 0 0 1-2.956 2.956h-.591a4.73 4.73 0 0 0-9.458 0h-4.73a1.182 1.182 0 0 1-1.182-1.182v-5.911Z"
      />
      <Path
        fill="#899687"
        fillRule="evenodd"
        d="M25.52 29.067a2.365 2.365 0 1 0 3.344 3.344 2.365 2.365 0 0 0-3.344-3.344Z"
        clipRule="evenodd"
      />
      <Path
        fill="#E0C5D1"
        d="M13.005 10.64a1.182 1.182 0 0 1 1.182 1.183v17.734c0 .137-.023.268-.066.39a4.73 4.73 0 0 0-9.392.732c-1.345-.275-2.4-1.473-2.308-2.968a29.414 29.414 0 0 1 5.883-15.927 2.895 2.895 0 0 1 2.317-1.143h2.384Z"
      />
      <Path
        fill="#899687"
        d="M6.305 29.95a3.153 3.153 0 1 1 6.305 0 3.153 3.153 0 0 1-6.305 0ZM23.645 29.95a3.153 3.153 0 1 1 6.306 0 3.153 3.153 0 0 1-6.306 0Z"
      />
      <Path
        stroke="#899687"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M34.68 22.069H15.763V11.822"
      />
      <Path
        stroke="#899687"
        strokeLinecap="round"
        strokeWidth={1.5}
        d="M15.764 22.07v4.728"
      />
      <Path
        fill="#899687"
        d="M6.53 20.493c-.83 0 .827-3.572 1.973-5.777a.986.986 0 0 1 .878-.528h.653a1 1 0 0 1 1 1v4.305a1 1 0 0 1-1 1H6.53Z"
      />
    </G>
    <Path
      stroke="#899687"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="m40.282 28.996 10.19-.25M39.922 23.966l4.178-.116"
    />
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M37.833 0H0v37.833h37.833z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgComponent
