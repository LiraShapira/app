import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke="#8A8A8A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5.564 1v2.25M15.774 1v2.25M1.917 16.75V5.5c0-.597.231-1.169.641-1.591.41-.422.967-.659 1.547-.659h13.128c.58 0 1.137.237 1.547.659.41.422.64.994.64 1.591v11.25m-17.503 0c0 .597.231 1.169.641 1.591.41.422.967.659 1.547.659h13.128c.58 0 1.137-.237 1.547-.659.41-.422.64-.994.64-1.591m-17.503 0v-7.5c0-.597.231-1.169.641-1.591.41-.422.967-.659 1.547-.659h13.128c.58 0 1.137.237 1.547.659.41.422.64.994.64 1.591v7.5m-8.75-6h.007v.008h-.008v-.008Zm0 2.25h.007v.008h-.008V13Zm0 2.25h.007v.008h-.008v-.008ZM8.48 13h.008v.008h-.008V13Zm0 2.25h.008v.008h-.008v-.008ZM6.293 13h.008v.008h-.008V13Zm0 2.25h.008v.008h-.008v-.008Zm6.564-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13Zm0 2.25h.008v.008h-.008v-.008Zm2.188-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13Z"
    />
  </Svg>
)
export default SvgComponent
