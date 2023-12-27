const Logo = ({ width = 24, height = 24 }) => {
  return (
    <svg
      width="31"
      height="35"
      viewBox="0 0 31 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.66605 18.7058C-0.222017 17.0205 -0.222018 14.9854 0.66605 13.3001L5.81448 3.5299C6.77375 1.70948 8.62058 0.576273 10.6281 0.576272L20.3719 0.576272C22.3794 0.576272 24.2262 1.70948 25.1855 3.52989L30.334 13.3001C31.222 14.9854 31.222 17.0205 30.334 18.7058L25.1855 28.4761C24.2263 30.2965 22.3794 31.4297 20.3719 31.4297L10.6281 31.4297C8.62058 31.4297 6.77375 30.2965 5.81448 28.4761L0.66605 18.7058Z"
        fill="#3772FF"
      />
      <g filter="url(#filter0_d_162_56753)">
        <path
          d="M15.4993 6.00391L7.10351 11.0039L7.10352 16.6814L10.1712 18.5081L10.1712 12.8327L15.4993 9.65974L20.8275 12.8327L20.8275 18.5081L23.8952 16.6814L23.8952 11.0039L15.4993 6.00391Z"
          fill="url(#paint0_linear_162_56753)"
        />
        <path
          d="M15.4993 22.3481L7.10352 17.3481L7.10352 21.0039L15.4993 26.0039L23.8952 21.0039L23.8952 17.3481L15.4993 22.3481Z"
          fill="url(#paint1_linear_162_56753)"
        />
      </g>
      <path
        d="M1.32957 18.3562C0.556811 16.8897 0.556811 15.1162 1.32956 13.6498L6.478 3.87954C7.31159 2.29761 8.90755 1.32627 10.6281 1.32627L20.3719 1.32627C22.0925 1.32627 23.6884 2.29761 24.522 3.87953L29.6704 13.6498C30.4432 15.1162 30.4432 16.8897 29.6704 18.3562L24.522 28.1264C23.6884 29.7083 22.0925 30.6797 20.3719 30.6797L10.6281 30.6797C8.90755 30.6797 7.3116 29.7084 6.478 28.1264L1.32957 18.3562Z"
        stroke="url(#paint2_linear_162_56753)"
        stroke-width="1.5"
      />
      <defs>
        <filter
          id="filter0_d_162_56753"
          x="1.10352"
          y="3.00391"
          width="28.791"
          height="32"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_162_56753"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_162_56753"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_162_56753"
          x1="8.10031"
          y1="10.0345"
          x2="22.0954"
          y2="20.8298"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="#FCFCFD" stop-opacity="0.75" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_162_56753"
          x1="8.10031"
          y1="10.0345"
          x2="22.0954"
          y2="20.8298"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="#FCFCFD" stop-opacity="0.75" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_162_56753"
          x1="-6.74323e-07"
          y1="16.003"
          x2="31"
          y2="16.003"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#7EA4FF" stop-opacity="0.27" />
          <stop offset="1" stop-color="#1448C4" stop-opacity="0.42" />
        </linearGradient>
      </defs>
    </svg>
  );
};
export default Logo;
