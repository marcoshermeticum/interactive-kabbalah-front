import { SephirotProps } from '../Sephirot.types';

function BiggerSephirot({
  className = '',
  world,
  regent,
  sephirot,
  planet,
}: SephirotProps<'bigger'>) {
  return (
    <svg
      className={className}
      width="10rem"
      height="10rem"
      viewBox="0 0 500 500"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <path
          id="path-3"
          d="M 139.341 173.495 C 145.546 167.289 154.447 152.668 157.129 152.668 C 162.423 149.573 169.739 142.123 173.025 138.837 C 180.333 135.216 186.519 133.601 190.992 130.619 C 194.026 125.853 209.191 127.118 212.783 123.526 C 219.687 118.766 229.009 118.78 233.274 118.78 C 244.666 116.706 247.342 117.869 256.397 115.605 C 265.166 114.21 271.749 118.412 278.623 118.412 C 286.966 118.412 289.583 122.52 295.82 122.52 C 299.535 124.933 308.446 127.596 311.44 128.594 C 320.807 133.495 329.249 134.866 337.812 137.193 C 342.395 140.393 346.433 143.211 349.961 146.738 C 354.637 151.415 357.555 156.068 361.241 159.754 C 364.924 162.68 368.061 167.876 370.353 170.167 C 373.48 173.295 374.307 177.208 375.993 180.581 C 376.427 184.527 378.441 188.793 379.464 191.861 C 379.898 197.782 382.488 200.498 383.803 204.444 C 384.671 209.871 387.274 213.292 387.274 217.026 L 387.274 218.328 C 387.742 219.731 388.576 221.856 388.576 223.1"
          style={{ fill: 'none' }}
        />
        <path
          id="text-path-0"
          d="M 55.531 231.448 C 94.502 213.995 143.65 217.877 169.224 235.583 C 171.568 237.206 173.986 238.461 176.082 239.921"
        />
        <path
          id="path-4"
          d="M 139.667 345.131 C 144.441 351.206 156.55 350.988 158.501 352.94 C 161.876 357.183 168.082 359.954 169.348 362.485 C 173.215 365.208 179.992 367.949 182.542 370.499 C 188.324 372.426 192.592 375.006 197.294 376.573 C 202.548 378.983 207.9 381.346 211.789 381.346 C 219.733 381.779 226.192 385.454 232.891 385.454 C 241.649 385.888 249.973 385.888 258.297 385.888 C 268.912 385.888 274.611 385.888 280.311 385.888 C 284.469 384.026 289.721 385.956 293.327 384.153 C 300.522 382.593 305.766 381.801 311.037 380.044 C 315.064 377.649 321.855 377.051 324.487 373.102 C 327.287 367.741 332.956 363.444 337.07 361.387 C 343.218 356.556 346.591 351.569 351.388 348.371 C 354.765 342.918 358.751 339.719 360.933 335.355 C 365.483 329.158 368.674 324.806 372.621 320.859 C 375.293 317.069 378.389 313.791 381.299 310.88 C 384.647 307.098 386.913 301.565 389.976 300.033 L 390.41 299.166 C 393.597 295.979 394.7 289.612 397.18 287.131"
          style={{ fill: 'none' }}
        />
        <path
          id="path-5"
          d="M 165.17 364.228 C 172.038 369.795 192.809 375.813 195.541 378.546 C 200.031 382.168 205.559 383.621 209.169 384.824 C 219.872 385.539 227.902 386.967 236.054 386.967 C 242.76 387.401 247.981 387.835 253.409 387.835 C 260.036 387.835 265.36 387.835 270.685 387.835 C 276.39 387.835 281.966 384.364 286.739 384.364 C 291.088 379.433 292.057 376.715 296.718 374.385 C 303.168 371.656 309.47 371.046 313.205 369.178 C 318.649 368.744 317.473 364.007 321.015 362.236 C 322.371 361.369 330.215 356.941 330.994 356.162 C 333.751 354.566 337.801 351.823 340.539 351.823 L 347.915 355.294 C 361.956 343.284 348.929 345.78 354.167 340.542"
          style={{ fill: 'none' }}
        />
        <path
          id="path-6"
          d="M 39.754 195.969 C 263.988 204.27 49.457 196.299 264.26 200.893"
        />
        <path
          id="path-7"
          d="M 173.594 353.507 C 250.636 393 334.412 376.447 355.783 305.311"
          style={{ fill: 'none' }}
        />
        <path
          id="path-8"
          d="M -30.535 275.249 C 124.485 153.2 236.992 259.575 264.3 296.454"
        />
        <path
          id="path-9"
          d="M 166.249 353.888 C 252.417 398.949 303.063 380.818 358.254 348.194"
          style={{ fill: 'none' }}
        />
        <path
          id="path-10"
          d="M 186.365 365.24 C 254.372 385.234 263.025 376.855 311.391 368.066"
          style={{ fill: 'none' }}
        />
        <path
          id="path-11"
          d="M -32.777 279.196 C 108.52 142.156 215.901 260.628 248.526 306.212"
        />
        <path
          id="path-12"
          d="M -3.838 276.726 C 178.396 377.65 277.678 246.229 253.923 266.054"
        />
        <pattern
          id="malkuth-world"
          patternUnits="objectBoundingBox"
          height="1"
          width="1"
        >
          <image
            x="-130"
            y="-128"
            width="700"
            height="700"
            href="/malkuth.png"
          ></image>
        </pattern>
        <pattern
          id="malkuth-regent"
          patternUnits="objectBoundingBox"
          height="1"
          width="1"
        >
          <image
            x="-130"
            y="-128"
            width="600"
            height="600"
            href="/malkuth.png"
          ></image>
        </pattern>
        <pattern
          id="malkuth-sephirot"
          patternUnits="objectBoundingBox"
          height="1"
          width="1"
        >
          <image
            x="-75"
            y="-73"
            width="433"
            height="433"
            href="/malkuth.png"
          ></image>
        </pattern>
        <pattern
          id="malkuth-planet"
          patternUnits="objectBoundingBox"
          height="1"
          width="1"
        >
          <image
            x="-150"
            y="-150"
            width="500"
            height="500"
            href="/malkuth.png"
          ></image>
        </pattern>
      </defs>
      <ellipse
        fill={world.backgroundColor || 'rgb(73, 73, 73)'}
        stroke={world.strokeColor || 'white'}
        cx="251.627"
        cy="250.432"
        rx="222"
        ry="222"
      >
        <title>first circle slot</title>
      </ellipse>
      <ellipse
        fill={regent.backgroundColor || 'rgb(73, 73, 73)'}
        stroke={regent.strokeColor || 'white'}
        strokeWidth={'5px'}
        cx="249.865"
        cy="247.141"
        rx="175"
        ry="175"
      >
        <title>second circle slot</title>
      </ellipse>
      <ellipse
        fill={sephirot.backgroundColor}
        strokeWidth={'5px'}
        stroke={regent.strokeColor || 'white'}
        cx="249.9"
        cy="247.1"
        rx="140"
        ry="140"
      >
        <title>third circle slot</title>
      </ellipse>
      <ellipse
        fill={planet.backgroundColor}
        strokeWidth={'1px'}
        stroke={planet.strokeColor || 'white'}
        cx="251.6"
        cy="250.4"
        rx="100"
        ry="100"
      >
        <title>four and last circle slot</title>
      </ellipse>
      <text
        style={{
          fill: planet.fontColor || 'white',
          fontFamily: 'Arial, sans-serif',
          fontSize: '95px',
        }}
        x={planet.coordinates?.icon?.x || '222'}
        y={planet.coordinates?.icon?.y || '266'}
      >
        {planet.icon}
      </text>
      <text
        style={{
          whiteSpace: 'pre',
          fill: planet.fontColor || 'white',
          fontFamily: 'Arial, sans-serif',
          fontSize: '30px',
        }}
        x={planet.coordinates?.number?.x || '240'}
        y={planet.coordinates?.number?.y || '320'}
      >
        {planet.number}
      </text>

      <text
        style={{
          fill: 'rgb(51, 51, 51)',
          fontFamily: 'Arial, sans-serif',
          fontSize: '28px',
          letterSpacing: '2.7px',
          whiteSpace: 'pre',
          transformBox: 'fill-box',
          transformOrigin: '152.356px 23.5284px',
        }}
        transform="matrix(1, 0, 0, 1, 141.049225, -78.969482)"
      >
        {
          // prettier-ignore
          <textPath href="#text-path-0" startOffset={sephirot.startOffset?.name}>{sephirot.name}</textPath>
        }
      </text>
      <text
        style={{
          fill: 'rgb(51, 51, 51)',
          fontFamily: 'Arial, sans-serif',
          fontSize: '21px',
          letterSpacing: '4.3px',
          transformBox: 'fill-box',
          transformOrigin: 'center center',
          transform: 'none',
        }}
      >
        <textPath href="#path-7" startOffset={sephirot.startOffset?.valor}>
          {sephirot.valor}
        </textPath>
      </text>
      <text
        style={{
          fill: world.fontColor || 'rgb(51, 51, 51)',
          fontFamily: 'Arial, sans-serif',
          fontSize: '18px',
          letterSpacing: '2.7px',
          whiteSpace: 'pre',
          transformOrigin: '198.262px 216.42px',
        }}
        transform="matrix(1, 0, 0, 1, 142.807053, -161.571259)"
      >
        <textPath href="#path-8" startOffset={world.startOffset?.title}>
          {world.title}
        </textPath>
      </text>
      <text
        style={{
          fill: 'rgb(51, 51, 51)',
          fontFamily: 'Arial, sans-serif',
          fontSize: '18px',
          letterSpacing: '2.7px',
          whiteSpace: 'pre',
          transformOrigin: '198.262px 216.42px',
        }}
        transform="matrix(1, 0, 0, 1, 127.945137, 136.09874)"
      >
        {
          // prettier-ignore
          <textPath href="#path-12" startOffset={world.startOffset?.aspect}>{world.aspect}</textPath>
        }
      </text>
      <text
        style={{
          fill: regent.fontColor,
          fontFamily: 'Arial, sans-serif',
          fontSize: '18px',
          letterSpacing: '2.7px',
          whiteSpace: 'pre',
          transformOrigin: '198.262px 216.42px',
        }}
        transform="matrix(1, 0, 0, 1, 151.376389, -120.120537)"
      >
        {
          // prettier-ignore
          <textPath href="#path-11" startOffset={regent.startOffset?.title}>{regent.title}</textPath>
        }
      </text>
      <text
        style={{
          fill: regent.fontColor,
          fontFamily: 'Arial, sans-serif',
          fontSize: '17px',
          letterSpacing: '4.3px',
          whiteSpace: 'pre',
          transformOrigin: '253.647px 345.094px',
        }}
        transform="matrix(0.601815, 0.798636, -0.798636, 0.601815, -109.637955, -26.001652)"
      >
        <textPath href="#path-9" startOffset={regent.startOffset?.name}>
          {regent.name}
        </textPath>
      </text>
      <text
        style={{
          fill: regent.fontColor,
          fontFamily: 'Arial, sans-serif',
          fontSize: '21px',
          letterSpacing: '4.3px',
          whiteSpace: 'pre',
          transformOrigin: '253.647px 345.094px',
        }}
        transform="matrix(0.515039, -0.857168, 0.857168, 0.515039, 110.708572, -32.951153)"
        id="object-0"
      >
        <textPath href="#path-10" startOffset={regent.startOffset?.defect}>
          {regent?.defect}
        </textPath>
      </text>
    </svg>
  );
}

export default BiggerSephirot;
