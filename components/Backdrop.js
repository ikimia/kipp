import * as React from "react";
import { StyleSheet } from "react-native";
import Svg, {
  Defs,
  Pattern,
  Rect,
  Polygon,
  LinearGradient,
  Stop,
  G,
  Path
} from "react-native-svg";

export const PATTERNS = {
  ZigZag: "ZigZag",
  Checkerboard: "Checkerboard",
  Parallelogram: "Parallelogram",
  HexagonDiamonds: "HexagonDiamonds",
  DiagonalStripes: "DiagonalStripes",
  Waves: "Waves",
  Triangles: "Triangles",
  Sunset: "Sunset"
};

export default function Backdrop({ pattern }) {
  return (
    <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
      <Defs>
        <Pattern
          id={PATTERNS.ZigZag}
          width="120"
          height="120"
          patternUnits="userSpaceOnUse"
        >
          <Rect fill="#00bb77" width="120" height="120" />
          <Polygon
            fill="#000"
            fillOpacity=".1"
            points="120 0 120 60 90 30 60 0 0 0 0 0 60 60 0 120 60 120 90 90 120 60 120 0"
          />
        </Pattern>
        <Pattern
          id={PATTERNS.Checkerboard}
          width="200"
          height="200"
          patternUnits="userSpaceOnUse"
        >
          <Rect fill="#990000" width="200" height="200" />
          <G fill="none" stroke="#FFF" strokeWidth="0">
            <Polygon points="0 100-100 200 0 300 100 200" />
            <Polygon points="200 100 100 200 200 300 300 200" />
            <Polygon points="200-100 100 0 200 100 300 0" />
            <Polygon points="0-100-100 0 0 100 100 0" />
          </G>
          <G stroke="#FFF" strokeWidth="0" strokeOpacity="1">
            <Polygon fill="#A00" points="100 0 0 100 100 200 200 100" />
          </G>
        </Pattern>
        <Pattern
          id={PATTERNS.Parallelogram}
          viewBox="0 0 400 200"
          width="100"
          height="50"
          patternUnits="userSpaceOnUse"
        >
          <Rect fill="#555555" width="400" height="200" />
          <G stroke="#888" strokeWidth="0.4" strokeMiterlimit="10">
            <G fill="none">
              <Polygon points="400 90 200 10 200-90 400-10" />
              <Polygon points="200 110 0 190 0 90 200 10" />
              <Polygon points="400 290 200 210 200 110 400 190" />
            </G>
            <G fill="#555">
              <Polygon points="400 190 200 110 200 10 400 90" />
              <Polygon points="200 210 0 290 0 190 200 110" />
              <Polygon points="200 10 0 90 0-10 200-90" />
            </G>
          </G>
        </Pattern>
        <Pattern
          id={PATTERNS.HexagonDiamonds}
          width="150"
          height="130"
          patternUnits="userSpaceOnUse"
        >
          <Rect fill="#666" width="150" height="130" />
          <G fill="#666">
            <Polygon
              stroke="#333"
              strokeWidth="3.8"
              strokeMiterlimit="10"
              points="112.5,0 37.5,0 0,65 37.5,130 112.5,130 150,65 "
            />
          </G>
        </Pattern>
        <Pattern
          id={PATTERNS.DiagonalStripes}
          viewBox="0 0 20 20"
          width="25"
          height="25"
          patternUnits="userSpaceOnUse"
        >
          <Rect fill="#113311" width="20" height="20" />
          <G>
            <Polygon fill="#242" points="20 10 10 0 0 0 20 20" />
            <Polygon fill="#242" points="0 10 0 20 10 20" />
          </G>
        </Pattern>
        <Pattern
          id={PATTERNS.Waves}
          viewBox="0 0 1000 120"
          width="250"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          <Rect fill="#000000" width="1000" height="120" />
          <G fill="none" stroke="#222" strokeWidth="10">
            <Path d="M-500 75c0 0 125-30 250-30S0 75 0 75s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30" />
            <Path d="M-500 45c0 0 125-30 250-30S0 45 0 45s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30" />
            <Path d="M-500 105c0 0 125-30 250-30S0 105 0 105s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30" />
            <Path d="M-500 15c0 0 125-30 250-30S0 15 0 15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30" />
            <Path d="M-500-15c0 0 125-30 250-30S0-15 0-15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30" />
            <Path d="M-500 135c0 0 125-30 250-30S0 135 0 135s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30" />
          </G>
        </Pattern>
        <Pattern
          id={PATTERNS.Triangles}
          width="540"
          height="450"
          viewBox="0 0 1080 900"
          patternUnits="userSpaceOnUse"
        >
          <Rect fill="#00b7ff" width="1080" height="900" />
          <G fillOpacity=".1">
            <Polygon fill="#444" points="90 150 0 300 180 300" />
            <Polygon points="90 150 180 0 0 0" />
            <Polygon fill="#AAA" points="270 150 360 0 180 0" />
            <Polygon fill="#DDD" points="450 150 360 300 540 300" />
            <Polygon fill="#999" points="450 150 540 0 360 0" />
            <Polygon points="630 150 540 300 720 300" />
            <Polygon fill="#DDD" points="630 150 720 0 540 0" />
            <Polygon fill="#444" points="810 150 720 300 900 300" />
            <Polygon fill="#FFF" points="810 150 900 0 720 0" />
            <Polygon fill="#DDD" points="990 150 900 300 1080 300" />
            <Polygon fill="#444" points="990 150 1080 0 900 0" />
            <Polygon fill="#DDD" points="90 450 0 600 180 600" />
            <Polygon points="90 450 180 300 0 300" />
            <Polygon fill="#666" points="270 450 180 600 360 600" />
            <Polygon fill="#AAA" points="270 450 360 300 180 300" />
            <Polygon fill="#DDD" points="450 450 360 600 540 600" />
            <Polygon fill="#999" points="450 450 540 300 360 300" />
            <Polygon fill="#999" points="630 450 540 600 720 600" />
            <Polygon fill="#FFF" points="630 450 720 300 540 300" />
            <Polygon points="810 450 720 600 900 600" />
            <Polygon fill="#DDD" points="810 450 900 300 720 300" />
            <Polygon fill="#AAA" points="990 450 900 600 1080 600" />
            <Polygon fill="#444" points="990 450 1080 300 900 300" />
            <Polygon fill="#222" points="90 750 0 900 180 900" />
            <Polygon points="270 750 180 900 360 900" />
            <Polygon fill="#DDD" points="270 750 360 600 180 600" />
            <Polygon points="450 750 540 600 360 600" />
            <Polygon points="630 750 540 900 720 900" />
            <Polygon fill="#444" points="630 750 720 600 540 600" />
            <Polygon fill="#AAA" points="810 750 720 900 900 900" />
            <Polygon fill="#666" points="810 750 900 600 720 600" />
            <Polygon fill="#999" points="990 750 900 900 1080 900" />
            <Polygon fill="#999" points="180 0 90 150 270 150" />
            <Polygon fill="#444" points="360 0 270 150 450 150" />
            <Polygon fill="#FFF" points="540 0 450 150 630 150" />
            <Polygon points="900 0 810 150 990 150" />
            <Polygon fill="#222" points="0 300 -90 450 90 450" />
            <Polygon fill="#FFF" points="0 300 90 150 -90 150" />
            <Polygon fill="#FFF" points="180 300 90 450 270 450" />
            <Polygon fill="#666" points="180 300 270 150 90 150" />
            <Polygon fill="#222" points="360 300 270 450 450 450" />
            <Polygon fill="#FFF" points="360 300 450 150 270 150" />
            <Polygon fill="#444" points="540 300 450 450 630 450" />
            <Polygon fill="#222" points="540 300 630 150 450 150" />
            <Polygon fill="#AAA" points="720 300 630 450 810 450" />
            <Polygon fill="#666" points="720 300 810 150 630 150" />
            <Polygon fill="#FFF" points="900 300 810 450 990 450" />
            <Polygon fill="#999" points="900 300 990 150 810 150" />
            <Polygon points="0 600 -90 750 90 750" />
            <Polygon fill="#666" points="0 600 90 450 -90 450" />
            <Polygon fill="#AAA" points="180 600 90 750 270 750" />
            <Polygon fill="#444" points="180 600 270 450 90 450" />
            <Polygon fill="#444" points="360 600 270 750 450 750" />
            <Polygon fill="#999" points="360 600 450 450 270 450" />
            <Polygon fill="#666" points="540 600 630 450 450 450" />
            <Polygon fill="#222" points="720 600 630 750 810 750" />
            <Polygon fill="#FFF" points="900 600 810 750 990 750" />
            <Polygon fill="#222" points="900 600 990 450 810 450" />
            <Polygon fill="#DDD" points="0 900 90 750 -90 750" />
            <Polygon fill="#444" points="180 900 270 750 90 750" />
            <Polygon fill="#FFF" points="360 900 450 750 270 750" />
            <Polygon fill="#AAA" points="540 900 630 750 450 750" />
            <Polygon fill="#FFF" points="720 900 810 750 630 750" />
            <Polygon fill="#222" points="900 900 990 750 810 750" />
            <Polygon fill="#222" points="1080 300 990 450 1170 450" />
            <Polygon fill="#FFF" points="1080 300 1170 150 990 150" />
            <Polygon points="1080 600 990 750 1170 750" />
            <Polygon fill="#666" points="1080 600 1170 450 990 450" />
            <Polygon fill="#DDD" points="1080 900 1170 750 990 750" />
          </G>
        </Pattern>
        <LinearGradient id={PATTERNS.Sunset} x1="0" x2="0" y1="0" y2="100%">
          <Stop offset="0" stopColor="#80F" />
          <Stop offset="1" stopColor="#f40" />
        </LinearGradient>
      </Defs>
      <Rect fill={`url(#${pattern})`} width="100%" height="100%" />
    </Svg>
  );
}
